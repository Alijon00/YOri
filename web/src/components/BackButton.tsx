import { useLocation, useNavigate } from 'react-router-dom';
import { useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import { IconBack } from './icons';

// Кнопка «Назад». Есть на всех экранах, кроме главного.
// Возвращает на предыдущий экран по истории; если истории нет
// (экран открыт по прямой ссылке) — ведёт на главную.
export function BackButton(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const t = useT();

  // key === 'default' означает, что это первая запись в истории роутера —
  // возвращаться некуда, уходим на главную.
  const canGoBack = location.key !== 'default';

  return (
    <div className="backrow">
      <button
        className="back"
        type="button"
        onClick={() => (canGoBack ? navigate(-1) : navigate('/'))}
      >
        <IconBack />
        {t(ui.back)}
      </button>
    </div>
  );
}
