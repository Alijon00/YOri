import { Navigate, useParams } from 'react-router-dom';
import { useT } from '../i18n/LangProvider';
import { situations } from '../content/situations';
import { routes } from '../content/routes';
import { H1 } from '../components/H1';
import { BackButton } from '../components/BackButton';
import { StepCard } from '../components/StepCard';
import { Note } from '../components/Note';
import { HelpPanel } from '../components/HelpPanel';

// Экран маршрута ситуации (#/s/:id).
// Надзаголовок — название ситуации, затем заголовок маршрута, нумерованные
// шаги, плашка поддержки и панель «кому можно позвонить» (справа на широких
// экранах, снизу на телефоне). Неизвестный id → редирект на главную.
export function Situation(): React.JSX.Element {
  const t = useT();
  const { id } = useParams();

  const situation = situations.find((s) => s.id === id);
  const route = routes.find((r) => r.id === id);

  if (!situation || !route) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="screen">
      <BackButton />

      <div className="col">
        <div className={`kicker ${situation.tone}`}>{t(situation.title)}</div>
        <H1>{t(route.heading)}</H1>
        {route.lead && <p className="lead">{t(route.lead)}</p>}
      </div>

      <div className="route">
        <div className="col">
          <div className="steps">
            {route.steps.map((step, i) => (
              <StepCard
                key={i}
                index={i + 1}
                title={step.title}
                text={step.text}
                extra={step.extra}
              />
            ))}
          </div>
          {route.note && <Note tone={route.noteTone}>{t(route.note)}</Note>}
        </div>

        <HelpPanel />
      </div>
    </div>
  );
}
