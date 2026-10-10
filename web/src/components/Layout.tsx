import { Link, Outlet } from 'react-router-dom';
import { useLang, useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import styles from './Layout.module.css';

export function Layout(): React.JSX.Element {
  const { lang, setLang } = useLang();
  const t = useT();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        {/* Логотип ведёт на главную */}
        <Link to="/" className={styles.logo} aria-label="Ёрӣ — на главную">
          Ёрӣ
        </Link>

        <div className={styles.actions}>
          {/* Озвучка. Пока заглушка — будет читать текст вслух. */}
          <button type="button" className={styles.listen}>
            <span aria-hidden="true">🔊</span> {t(ui.listen)}
          </button>

          {/* Переключатель языка. aria-pressed показывает активный язык. */}
          <div
            className={styles.langToggle}
            role="group"
            aria-label="Язык / Забон"
          >
            <button
              type="button"
              className={styles.langButton}
              aria-pressed={lang === 'tg'}
              onClick={() => setLang('tg')}
            >
              Тоҷикӣ
            </button>
            <button
              type="button"
              className={styles.langButton}
              aria-pressed={lang === 'ru'}
              onClick={() => setLang('ru')}
            >
              Рус
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
