import { useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import { PrimaryButton } from './PrimaryButton';
import { IconArrow } from './icons';

// Панель «Кому можно позвонить» на экране ситуации.
// Кнопка «Что будет после звонка» ведёт на #/call, «Все службы помощи» — на
// #/contacts. Имя и часы — плейсхолдеры из контента (заполнит C#-часть позже).
export function HelpPanel(): React.JSX.Element {
  const t = useT();
  return (
    <aside className="panel">
      <div className="panel-label">{t(ui.whoHelps)}</div>
      <div className="panel-name">{t(ui.helpline)}</div>
      <div className="small-muted">{t(ui.helplineMeta)}</div>
      <PrimaryButton to="/call" block>
        {t(ui.afterCall)}
        <IconArrow />
      </PrimaryButton>
      <PrimaryButton to="/contacts" variant="ghost" block>
        {t(ui.allHelp)}
      </PrimaryButton>
    </aside>
  );
}
