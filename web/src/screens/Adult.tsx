import { useT } from '../i18n/LangProvider';
import { adult } from '../content/adult';
import { H1 } from '../components/H1';
import { BackButton } from '../components/BackButton';
import { StepCard } from '../components/StepCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { IconArrow, IconCheck, IconCross } from '../components/icons';

// Экран для взрослых (#/adult).
// «Что сказать» (галочки), «Чего не делать» (крестики), «Что делать дальше»
// (нумерованные шаги) и кнопка на контакты.
export function Adult(): React.JSX.Element {
  const t = useT();

  return (
    <div className="screen">
      <BackButton />

      <div className="col">
        <div className="kicker calm">{t(adult.kicker)}</div>
        <H1>{t(adult.title)}</H1>
      </div>

      <div className="two">
        <div className="col">
          <div className="sub">{t(adult.sayT)}</div>
          {adult.say.map((phrase, i) => (
            <div className="row" key={i}>
              <span className="ic-ok">
                <IconCheck />
              </span>
              <span>{t(phrase)}</span>
            </div>
          ))}
        </div>

        <div className="col">
          <div className="sub">{t(adult.dontT)}</div>
          {adult.dont.map((item, i) => (
            <div className="row" key={i}>
              <span className="ic-no">
                <IconCross />
              </span>
              <span>
                <b>{t(item.title)}</b> {t(item.text)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="col">
        <div className="sub">{t(adult.nextT)}</div>
        <div className="steps">
          {adult.next.map((phrase, i) => (
            <StepCard key={i} index={i + 1} title={phrase} />
          ))}
        </div>
      </div>

      <div>
        <PrimaryButton to="/contacts">
          {t(adult.cta)}
          <IconArrow />
        </PrimaryButton>
      </div>
    </div>
  );
}
