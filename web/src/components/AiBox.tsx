import { useEffect, useId, useState } from 'react';
import { useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import { situations } from '../content/situations';
import { loadModel, classify } from '../ai/classify';
import type { ClassifyResult } from '../ai/classify';
import type { Label, Model } from '../ai/model';
import { PrimaryButton } from './PrimaryButton';
import { IconLock } from './icons';

// Блок «Или напиши своими словами». Разбор текста происходит на устройстве:
// текст нигде не сохраняется, не логируется и никуда не отправляется.
// Пустое поле обозначает отсутствие результата; 'empty' — слишком короткий ввод.
type BoxResult = ClassifyResult | { kind: 'empty' } | null;

// Куда ведёт метка: шантаж — на экран «прямо сейчас?», остальные — на маршрут.
function routeFor(label: Label): string {
  return label === 'blackmail' ? '/urgent' : `/s/${label}`;
}

export function AiBox(): React.JSX.Element {
  const t = useT();
  const textId = useId();
  const [text, setText] = useState('');
  const [result, setResult] = useState<BoxResult>(null);
  const [model, setModel] = useState<Model | null>(null);

  // Загружаем модель один раз при появлении блока.
  useEffect(() => {
    let active = true;
    loadModel().then((loaded) => {
      if (active) {
        setModel(loaded);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  function onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    // Слишком короткий ввод — просим написать подробнее.
    if (text.trim().length < 3) {
      setResult({ kind: 'empty' });
      return;
    }
    setResult(classify(text, model));
  }

  // Название ситуации по метке (для текста результата и кнопок).
  function titleFor(label: Label): string {
    const situation = situations.find((s) => s.id === label);
    return situation ? t(situation.title) : '';
  }

  return (
    <form className="ai" onSubmit={onSubmit}>
      <label htmlFor={textId}>{t(ui.aiLabel)}</label>
      <textarea
        id={textId}
        placeholder={t(ui.aiPh)}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="ai-row">
        <button className="btn small" type="submit">
          {t(ui.aiGo)}
        </button>
      </div>
      <div className="privacy">
        <IconLock />
        {t(ui.aiPrivacy)}
      </div>

      {result && (
        <AiResult
          result={result}
          titleFor={titleFor}
          onClear={() => setResult(null)}
        />
      )}
    </form>
  );
}

// Блок результата. role="status" — чтобы экранная читалка объявила ответ.
function AiResult({
  result,
  titleFor,
  onClear,
}: {
  result: Exclude<BoxResult, null>;
  titleFor: (label: Label) => string;
  onClear: () => void;
}): React.JSX.Element {
  const t = useT();

  if (result.kind === 'empty') {
    return (
      <div className="result unsure" role="status">
        {t(ui.aiEmpty)}
      </div>
    );
  }

  if (result.kind === 'match') {
    return (
      <div className="result" role="status">
        <div>{t(ui.aiLike)}</div>
        <div className="result-title">{titleFor(result.label)}</div>
        <div className="result-actions">
          <PrimaryButton to={routeFor(result.label)} size="small">
            {t(ui.aiOpen)}
          </PrimaryButton>
          <PrimaryButton onClick={onClear} variant="ghost" size="small">
            {t(ui.aiSelf)}
          </PrimaryButton>
        </div>
      </div>
    );
  }

  if (result.kind === 'maybe') {
    return (
      <div className="result" role="status">
        <div>{t(ui.aiMaybe)}</div>
        <div className="result-actions">
          {result.labels.map((label) => (
            <PrimaryButton key={label} to={routeFor(label)} size="small">
              {titleFor(label)}
            </PrimaryButton>
          ))}
        </div>
      </div>
    );
  }

  // unsure
  return (
    <div className="result unsure" role="status">
      <div>{t(ui.aiUnsure)}</div>
      <div className="result-actions">
        <PrimaryButton to="/call" size="small">
          {t(ui.whoHelps)}
        </PrimaryButton>
      </div>
    </div>
  );
}
