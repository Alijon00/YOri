// SVG-иконки. Перенесены из объекта IC в reference/app.js.
// Все иконки декоративные — aria-hidden, рядом всегда есть текст.
// Используем currentColor, поэтому цвет задаётся через CSS родителя.
import type { ReactNode } from 'react';
import type { SituationId } from '../content/types';

// Общая обёртка <svg> с параметрами штриха из прототипа.
function Svg({
  size,
  strokeWidth,
  children,
}: {
  size: number;
  strokeWidth: number;
  children: ReactNode;
}): React.JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// --- Иконки ситуаций (24×24) --- //

export function IconBlackmail(): React.JSX.Element {
  return (
    <Svg size={24} strokeWidth={2}>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" />
    </Svg>
  );
}

export function IconPhotos(): React.JSX.Element {
  return (
    <Svg size={24} strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </Svg>
  );
}

export function IconBully(): React.JSX.Element {
  return (
    <Svg size={24} strokeWidth={2}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Svg>
  );
}

export function IconStranger(): React.JSX.Element {
  return (
    <Svg size={24} strokeWidth={2}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8a2 2 0 1 1 2 2c-.6 0-1 .4-1 1v1M20 15h.01" />
    </Svg>
  );
}

export function IconHacked(): React.JSX.Element {
  return (
    <Svg size={24} strokeWidth={2}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3" />
    </Svg>
  );
}

export function IconOther(): React.JSX.Element {
  return (
    <Svg size={24} strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
    </Svg>
  );
}

// Иконка по идентификатору ситуации — для плиток на главном экране.
const situationIcons: Record<SituationId, () => React.JSX.Element> = {
  blackmail: IconBlackmail,
  photos: IconPhotos,
  bully: IconBully,
  stranger: IconStranger,
  hacked: IconHacked,
  other: IconOther,
};

export function SituationIcon({ id }: { id: SituationId }): React.JSX.Element {
  const Icon = situationIcons[id];
  return <Icon />;
}

// --- Иконки интерфейса --- //

export function IconBack(): React.JSX.Element {
  return (
    <Svg size={20} strokeWidth={2.2}>
      <path d="m15 18-6-6 6-6" />
    </Svg>
  );
}

export function IconArrow(): React.JSX.Element {
  return (
    <Svg size={20} strokeWidth={2.2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconCheck(): React.JSX.Element {
  return (
    <Svg size={18} strokeWidth={2.6}>
      <path d="M20 6 9 17l-5-5" />
    </Svg>
  );
}

export function IconCross(): React.JSX.Element {
  return (
    <Svg size={20} strokeWidth={2.4}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Svg>
  );
}

export function IconLock(): React.JSX.Element {
  return (
    <Svg size={14} strokeWidth={2.2}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </Svg>
  );
}

export function IconSound(): React.JSX.Element {
  return (
    <Svg size={18} strokeWidth={2}>
      <path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
    </Svg>
  );
}

export function IconAdult(): React.JSX.Element {
  return (
    <Svg size={20} strokeWidth={2}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </Svg>
  );
}
