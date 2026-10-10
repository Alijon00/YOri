import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// Заголовок экрана. При смене маршрута прокручивает страницу наверх и ставит
// фокус на заголовок (tabIndex=-1), чтобы экранная читалка объявила новый экран.
export function H1({ children }: { children: ReactNode }): React.JSX.Element {
  const ref = useRef<HTMLHeadingElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // preventScroll — фокус не должен возвращать страницу вниз к заголовку.
    ref.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <h1 className="h1" ref={ref} tabIndex={-1}>
      {children}
    </h1>
  );
}
