import { Link } from 'react-router-dom';
import type { Situation } from '../content/types';
import { useT } from '../i18n/LangProvider';
import { SituationIcon } from './icons';

// Плитка ситуации на главном экране. Это настоящая ссылка (<a>).
// «Шантаж» ведёт на экран «прямо сейчас?» (#/urgent), остальные — на маршрут
// ситуации (#/s/:id). Цвет значка задаётся тоном ситуации.
export function Tile({
  situation,
}: {
  situation: Situation;
}): React.JSX.Element {
  const t = useT();
  const to = situation.id === 'blackmail' ? '/urgent' : `/s/${situation.id}`;

  return (
    <Link className="tile" to={to}>
      <span className={`ico ${situation.tone}`}>
        <SituationIcon id={situation.id} />
      </span>
      {t(situation.title)}
    </Link>
  );
}
