import { useT } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import { contacts } from '../content/contacts';
import { H1 } from '../components/H1';
import { BackButton } from '../components/BackButton';

// Экран «Куда можно обратиться» (#/contacts). Карточки служб в сетке.
// У Take It Down — пометка «Нужен интернет» и внешняя ссылка.
export function Contacts(): React.JSX.Element {
  const t = useT();

  return (
    <div className="screen">
      <BackButton />
      <H1>{t(contacts.title)}</H1>

      <div className="contacts">
        {contacts.list.map((contact, i) => (
          <div className="contact" key={i}>
            <b>{t(contact.name)}</b>
            <span>{t(contact.description)}</span>
            {contact.needsInternet && contact.link ? (
              <>
                <span className="meta warm">{t(ui.needNet)}</span>
                <a href={contact.link} target="_blank" rel="noopener">
                  {new URL(contact.link).host}
                </a>
              </>
            ) : contact.meta ? (
              <span className="meta">{t(contact.meta)}</span>
            ) : null}
          </div>
        ))}
      </div>

      <p className="small-muted">{t(contacts.foot)}</p>
    </div>
  );
}
