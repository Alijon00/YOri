import { Link, Outlet } from 'react-router-dom';
import { useLang, useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import { IconSound } from './icons';

// Общий каркас: липкая шапка (.top) + область экрана (<main>).
// Разметка повторяет reference/index.html.
export function Layout(): React.JSX.Element {
  const { lang, setLang } = useLang();
  const t = useT();

  return (
    <>
      <header className="top">
        <div className="top-in">
          {/* Логотип ведёт на главную */}
          <Link to="/" className="brand" aria-label="Ёрӣ">
            Ёрӣ
          </Link>

          <div className="top-tools">
            {/* «Слушать» — с иконкой звука. Озвучка появится позже. */}
            <button className="pill" type="button">
              <IconSound />
              <span>{t(ui.listen)}</span>
            </button>

            {/* Переключатель языка. aria-pressed показывает активный язык. */}
            <div className="lang" role="group" aria-label="Язык / Забон">
              <button
                type="button"
                aria-pressed={lang === 'tg'}
                onClick={() => setLang('tg')}
              >
                Тоҷикӣ
              </button>
              <button
                type="button"
                aria-pressed={lang === 'ru'}
                onClick={() => setLang('ru')}
              >
                Рус
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
