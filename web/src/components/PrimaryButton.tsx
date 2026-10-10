import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Кнопка-действие семейства .btn из прототипа.
// Рендерит настоящий элемент по назначению:
//   to    → внутренняя ссылка (react-router Link, тег <a>);
//   href  → внешняя ссылка (<a target="_blank">, нужен интернет);
//   иначе → <button> с onClick.
// Высота .btn ≥ 52px, .btn.small ≥ 44px — требование к зоне нажатия соблюдено.
interface PrimaryButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'solid' | 'ghost';
  size?: 'md' | 'small';
  block?: boolean;
}

export function PrimaryButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  size = 'md',
  block = false,
}: PrimaryButtonProps): React.JSX.Element {
  const className = [
    'btn',
    variant === 'ghost' ? 'ghost' : '',
    size === 'small' ? 'small' : '',
    block ? 'block' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }

  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
