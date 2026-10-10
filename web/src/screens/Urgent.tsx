import { Link } from 'react-router-dom';
import { useT } from '../i18n/LangProvider';
import { urgent } from '../content/urgent';
import { H1 } from '../components/H1';
import { BackButton } from '../components/BackButton';
import { Note } from '../components/Note';
import { PrimaryButton } from '../components/PrimaryButton';

// Экран «Это происходит прямо сейчас?» (#/urgent).
// Все три варианта ведут к маршруту «шантаж» (#/s/blackmail) — различается
// только интонация входа. Плашка-совет внизу.
export function Urgent(): React.JSX.Element {
  const t = useT();

  return (
    <div className="screen">
      <BackButton />
      <div className="narrow">
        <H1>{t(urgent.title)}</H1>
        <p className="lead">{t(urgent.lead)}</p>

        <div className="choices">
          <Link className="choice warm" to="/s/blackmail">
            <b>{t(urgent.yes)}</b>
            <span>{t(urgent.yesSub)}</span>
          </Link>
          <Link className="choice calm" to="/s/blackmail">
            <b>{t(urgent.no)}</b>
            <span>{t(urgent.noSub)}</span>
          </Link>
        </div>

        <div>
          <PrimaryButton to="/s/blackmail" variant="ghost">
            {t(urgent.dunno)}
          </PrimaryButton>
        </div>

        <Note>{t(urgent.note)}</Note>
      </div>
    </div>
  );
}
