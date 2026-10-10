// Временный генератор модели: из ключевых слов прототипа собирает наивный
// Байес и пишет web/public/model.json строго по схеме из CLAUDE.md.
// Запуск: npm run build-model. Позже эту модель будет генерировать C#-часть.
//
// Метод: для каждой метки из ключевых слов (вес = сколько раз повторить)
// собираем «псевдо-документы», токенизируем, считаем мультиномиальный Байес
// со сглаживанием Лапласа (alpha = 1). Метка other — из нейтральных слов.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { tokenize } from '../src/ai/tokenize';
import { labels } from '../src/ai/model';
import type { Label, Model } from '../src/ai/model';
import { keywords, neutralWords } from './keywords';

const ALPHA = 1; // сглаживание Лапласа

// Коэффициент резкости: множитель для счётчиков. Чем больше, тем увереннее
// модель отделяет сработавшие метки от несработавших (на коротких фразах).
// Сохраняет соотношение весов ключевых слов (2:1 остаётся 2:1).
const SHARPNESS = 12;

// Счётчики токенов по каждой метке и число псевдо-документов (для trainSize).
const counts: Record<Label, Map<string, number>> = {
  blackmail: new Map(),
  photos: new Map(),
  bully: new Map(),
  stranger: new Map(),
  hacked: new Map(),
  other: new Map(),
};
let trainSize = 0;

// Добавляет токены одного документа в счётчик метки `repeat` раз.
function addDocument(label: Label, text: string, repeat: number): void {
  const tokens = tokenize(text);
  const bag = counts[label];
  for (let r = 0; r < repeat; r++) {
    trainSize += 1;
    for (const token of tokens) {
      bag.set(token, (bag.get(token) ?? 0) + 1);
    }
  }
}

// Темы: каждое ключевое слово — документ, повторённый `weight` раз.
(Object.keys(keywords) as Exclude<Label, 'other'>[]).forEach((label) => {
  for (const [token, weight] of keywords[label]) {
    addDocument(label, token, weight);
  }
});

// other: каждое нейтральное слово — один документ.
for (const word of neutralWords) {
  addDocument('other', word, 1);
}

// Словарь — объединение всех токенов всех меток.
const vocab = new Set<string>();
for (const label of labels) {
  for (const token of counts[label].keys()) {
    vocab.add(token);
  }
}
const vocabSize = vocab.size;

// Наивный Байес со сглаживанием Лапласа.
const logPriors = {} as Record<Label, number>;
const logLikelihoods = {} as Record<Label, Record<string, number>>;
const logUnseen = {} as Record<Label, number>;

// Априорные вероятности — равномерные: частоту тем не моделируем.
const uniformPrior = Math.log(1 / labels.length);

// Наибольшая сумма счётчиков по метке (после усиления) — для общего знаменателя.
let maxTotal = 0;
for (const label of labels) {
  let total = 0;
  for (const n of counts[label].values()) {
    total += n;
  }
  maxTotal = Math.max(maxTotal, total * SHARPNESS);
}

// ВАЖНО: знаменатель общий для всех меток. Тогда logUnseen одинаков и размер
// темы (сколько у неё ключевых слов) не вносит перекоса — значение имеет только
// наличие и вес конкретных токенов. Так сохраняются исходные веса из прототипа.
const denom = maxTotal + ALPHA * vocabSize;
const unseen = Math.log(ALPHA / denom);

for (const label of labels) {
  const bag = counts[label];

  logPriors[label] = uniformPrior;
  logUnseen[label] = unseen;

  const likelihoods: Record<string, number> = {};
  for (const [token, n] of bag) {
    likelihoods[token] = Math.log((n * SHARPNESS + ALPHA) / denom);
  }
  logLikelihoods[label] = likelihoods;
}

const model: Model = {
  version: 'temp-1',
  labels,
  logPriors,
  logLikelihoods,
  logUnseen,
  thresholds: { minConfidence: 0.55, minMargin: 0.15 },
  metrics: { trainSize, accuracy: null },
};

const outPath = fileURLToPath(new URL('../public/model.json', import.meta.url));
writeFileSync(outPath, `${JSON.stringify(model, null, 2)}\n`, 'utf8');

// Короткий отчёт в консоль (пользовательский текст сюда не попадает).
console.log(
  `model.json записан: ${labels.length} меток, словарь ${vocabSize} токенов, trainSize ${trainSize}`,
);
