import { useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import { situations } from '../content/situations';
import { H1 } from '../components/H1';
import { AiBox } from '../components/AiBox';
import { Tile } from '../components/Tile';
import { PrimaryButton } from '../components/PrimaryButton';
import { IconAdult, IconCheck } from '../components/icons';

// Главный экран (#/). Слева — заголовок, поле «напиши своими словами»,
// строка про офлайн и вход для взрослых; справа — 6 плиток ситуаций.
// На телефоне всё в одну колонку, плитки под текстом (см. .home в стилях).
export function Home(): React.JSX.Element {
  const t = useT();

  return (
    <div className="screen home">
      <div className="intro">
        <H1>{t(ui.homeTitle)}</H1>
        <p className="lead">{t(ui.homeLead)}</p>

        <AiBox />

        <div className="offline">
          <IconCheck />
          {t(ui.offline)}
        </div>

        <PrimaryButton to="/adult" variant="ghost">
          <IconAdult />
          {t(ui.adultBtn)}
        </PrimaryButton>
      </div>

      <div className="tiles">
        {situations.map((situation) => (
          <Tile key={situation.id} situation={situation} />
        ))}
      </div>
    </div>
  );
}
