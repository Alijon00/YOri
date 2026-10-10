import { useId, useRef, useState } from 'react';
import { useT } from '../i18n/LangProvider';
import { report } from '../content/report';
import type { ReportTab } from '../content/types';
import { H1 } from '../components/H1';
import { BackButton } from '../components/BackButton';
import { StepCard } from '../components/StepCard';
import { Note } from '../components/Note';

// Порядок вкладок на экране.
const reportTabs: ReportTab[] = ['Instagram', 'Telegram', 'TikTok', 'other'];

// Экран «Как пожаловаться» (#/report).
// Вкладки площадок — настоящий tablist: role=tab/tablist, aria-selected,
// переключение стрелками ←/→ (по кругу) с переносом фокуса. Под вкладками —
// шаги выбранной площадки и плашка.
export function Report(): React.JSX.Element {
  const t = useT();
  const [active, setActive] = useState<ReportTab>('Instagram');
  const panelId = useId();

  // Ссылки на кнопки вкладок — чтобы переносить фокус при навигации стрелками.
  const tabRefs = useRef<Record<ReportTab, HTMLButtonElement | null>>({
    Instagram: null,
    Telegram: null,
    TikTok: null,
    other: null,
  });

  // Сдвиг активной вкладки по кругу с переносом фокуса.
  function move(dir: 1 | -1): void {
    const i = reportTabs.indexOf(active);
    const next = reportTabs[(i + dir + reportTabs.length) % reportTabs.length];
    if (next) {
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  function onTabKeyDown(e: React.KeyboardEvent<HTMLButtonElement>): void {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      move(-1);
    }
  }

  return (
    <div className="screen">
      <BackButton />
      <H1>{t(report.title)}</H1>

      <div className="tabs" role="tablist">
        {reportTabs.map((name) => {
          const selected = name === active;
          const label = name === 'other' ? t(report.otherLabel) : name;
          return (
            <button
              key={name}
              ref={(el) => {
                tabRefs.current[name] = el;
              }}
              className="tab"
              type="button"
              role="tab"
              id={`tab-${name}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(name)}
              onKeyDown={onTabKeyDown}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        className="steps"
        role="tabpanel"
        id={panelId}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
      >
        {report.tabs[active].map((step, i) => (
          <StepCard key={i} index={i + 1} title={step} />
        ))}
      </div>

      <Note>{t(report.note)}</Note>
    </div>
  );
}
