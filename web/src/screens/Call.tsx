import { useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import { call } from '../content/call';
import { H1 } from '../components/H1';
import { BackButton } from '../components/BackButton';
import { PrimaryButton } from '../components/PrimaryButton';

// Экран «Что будет, когда ты позвонишь» (#/call).
// Карточка службы с выделяемым номером и кнопкой «Скопировать номер»
// (логика копирования — W5), затем таймлайн разговора и подпись об источнике.
export function Call(): React.JSX.Element {
  const t = useT();
  const last = call.items.length - 1;

  return (
    <div className="screen">
      <BackButton />
      <div className="narrow">
        <div className="panel">
          <div className="panel-label">{t(ui.whoHelps)}</div>
          <div className="panel-name">{t(ui.helpline)}</div>
          <div className="small-muted">{t(ui.helplineMeta)}</div>
          <div className="numberbox">
            {/* Номер выделяется целиком (user-select: all) для копирования. */}
            <code id="num-main">{t(ui.number)}</code>
            {/* Логика копирования — в W5. */}
            <button className="btn ghost small" type="button">
              {t(ui.copyNum)}
            </button>
          </div>
        </div>

        <H1>{t(call.title)}</H1>

        <div className="timeline">
          {call.items.map((item, i) => (
            <div className="tl" key={i}>
              <div className="tl-rail">
                <span className="tl-dot" />
                {i < last && <span className="tl-line" />}
              </div>
              <div className="tl-body">
                <b>{t(item.title)}</b>
                <span>{t(item.text)}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="small-muted">{t(call.source)}</p>

        <PrimaryButton to="/contacts" variant="ghost">
          {t(ui.allHelp)}
        </PrimaryButton>
      </div>
    </div>
  );
}
