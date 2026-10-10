// Классификатор на устройстве. Текст пользователя здесь нигде не сохраняется,
// не логируется и никуда не отправляется — только локальный разбор по модели.

import { tokenize } from './tokenize';
import type { Label, Model } from './model';

// Результат классификации.
export type ClassifyResult =
  | { kind: 'match'; label: Label }
  | { kind: 'maybe'; labels: [Label, Label] }
  | { kind: 'unsure' };

// Кэш модели в памяти: один fetch на всю сессию.
let modelPromise: Promise<Model | null> | null = null;

// Загружает model.json один раз. При ошибке — понятное сообщение в консоль
// (без пользовательского текста) и null, чтобы вызвать результат 'unsure'.
export function loadModel(): Promise<Model | null> {
  if (!modelPromise) {
    // BASE_URL учитывает размещение в подпапке; модель — локальный файл.
    const url = `${import.meta.env.BASE_URL}model.json`;
    modelPromise = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<Model>;
      })
      .catch((error: unknown) => {
        console.error(
          'Ёрӣ: не удалось загрузить модель ИИ (model.json). ' +
            'Подсказки по словам работать не будут, остальной сайт — да.',
          error,
        );
        return null;
      });
  }
  return modelPromise;
}

// Классифицирует текст по уже загруженной модели. Не обращается к сети и не
// пишет в хранилище — только чистое вычисление.
export function classify(text: string, model: Model | null): ClassifyResult {
  if (!model) {
    return { kind: 'unsure' };
  }

  // Слова, которых нет НИ в одной метке, модель не знает — они не несут
  // информации. Если их учитывать (через logUnseen), фон из таких слов начинает
  // смещать выбор в сторону меток с меньшим словарём. Поэтому берём только
  // токены, известные модели хотя бы в одной метке.
  const known = new Set<string>();
  for (const label of model.labels) {
    for (const token of Object.keys(model.logLikelihoods[label])) {
      known.add(token);
    }
  }
  const tokens = tokenize(text).filter((token) => known.has(token));

  // Логарифм совместной вероятности для каждой метки.
  const scored = model.labels.map((label) => {
    const likelihoods = model.logLikelihoods[label];
    const unseen = model.logUnseen[label];
    let score = model.logPriors[label];
    for (const token of tokens) {
      score += likelihoods[token] ?? unseen;
    }
    return { label, score };
  });

  // Softmax → вероятности (вычитаем максимум для устойчивости).
  const maxScore = Math.max(...scored.map((s) => s.score));
  const exp = scored.map((s) => ({
    label: s.label,
    weight: Math.exp(s.score - maxScore),
  }));
  const sum = exp.reduce((acc, e) => acc + e.weight, 0);
  const probs = exp
    .map((e) => ({ label: e.label, p: e.weight / sum }))
    .sort((a, b) => b.p - a.p);

  const top = probs[0];
  const second = probs[1];
  if (!top || !second) {
    return { kind: 'unsure' };
  }

  const { minConfidence, minMargin } = model.thresholds;

  if (top.p >= minConfidence) {
    if (top.p - second.p >= minMargin) {
      // Уверенное совпадение — но only если это конкретная тема, не other.
      if (top.label !== 'other') {
        return { kind: 'match', label: top.label };
      }
    } else if (top.label !== 'other' && second.label !== 'other') {
      // Два близких кандидата — показываем оба.
      return { kind: 'maybe', labels: [top.label, second.label] };
    }
  }

  return { kind: 'unsure' };
}
