import { useId } from 'react';
import { Link } from 'react-router-dom';
import type { Localized, StepExtra } from '../content/types';
import { useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import { message, takeItDown } from '../content/routes';

// Нумерованный шаг. Базовый вид — номер + заголовок (+ пояснение).
// Доп. действия (extra) из прототипа:
//   report     — ссылка «Как пожаловаться» на экран #/report;
//   takeItDown — внешняя ссылка на сервис Take It Down (нужен интернет);
//   message    — готовый текст сообщения и кнопка «Скопировать»
//                (логика копирования появится в W5).
interface StepCardProps {
  index: number;
  title: Localized;
  text?: Localized;
  extra?: StepExtra;
}

export function StepCard({
  index,
  title,
  text,
  extra,
}: StepCardProps): React.JSX.Element {
  const t = useT();
  const quoteId = useId();

  let body: React.JSX.Element | null;

  if (!text && !extra) {
    // Простой шаг (например, на экранах «Как пожаловаться» и для взрослых):
    // только заголовок, без пояснения.
    body = null;
  } else if (extra === 'message') {
    body = (
      <>
        <div className="quote" id={quoteId}>
          {t(message)}
        </div>
        <div>
          {/* Логика копирования — в W5. Пока кнопка без действия. */}
          <button className="btn ghost small" type="button">
            {t(ui.copy)}
          </button>
        </div>
      </>
    );
  } else {
    body = (
      <span>
        {text ? t(text) : ''}
        {extra === 'report' && (
          <>
            {' '}
            <Link to="/report">
              <b>{t(ui.report)}</b>
            </Link>
          </>
        )}
        {extra === 'takeItDown' && (
          <>
            {' '}
            <a href={takeItDown.url} target="_blank" rel="noopener">
              <b>{t(takeItDown.name)}</b>
            </a>{' '}
            · {t(ui.needNet)}.
          </>
        )}
      </span>
    );
  }

  return (
    <div className="step">
      <span className="num">{index}</span>
      <div className="step-body">
        <b>{t(title)}</b>
        {body}
      </div>
    </div>
  );
}
