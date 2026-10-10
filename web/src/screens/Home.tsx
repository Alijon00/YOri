import { useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';

// Главный экран. Пока заглушка — позже здесь появится выбор ситуации.
// Заголовок берётся из контента через t().
export function Home(): React.JSX.Element {
  const t = useT();
  return (
    <section>
      <h1>{t(ui.homeTitle)}</h1>
    </section>
  );
}
