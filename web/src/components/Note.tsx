import type { ReactNode } from 'react';
import type { Tone } from '../content/types';

// Плашка поддержки/совета. Тон 'warm' — тревожная тема (оранжевый фон),
// иначе спокойный (зелёный). Перенесено из .note в прототипе.
export function Note({
  children,
  tone,
}: {
  children: ReactNode;
  tone?: Tone;
}): React.JSX.Element {
  const className = tone === 'warm' ? 'note warm' : 'note';
  return <div className={className}>{children}</div>;
}
