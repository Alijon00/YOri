// Типы контента. Весь текст двуязычный: ru + tg.

export type Lang = 'ru' | 'tg';

// Локализованная строка — обязательно оба языка.
export type Localized = Record<Lang, string>;

// Тон оформления: спокойный (зелёный) или тёплый (оранжевый, тревожные темы).
export type Tone = 'calm' | 'warm';

// Идентификаторы ситуаций на главном экране.
export type SituationId =
  'blackmail' | 'photos' | 'bully' | 'stranger' | 'hacked' | 'other';

// Карточка ситуации на главном экране.
export interface Situation {
  id: SituationId;
  title: Localized;
  tone: Tone;
}

// Доп. действие внутри шага маршрута:
// report — ссылка «как пожаловаться»; takeItDown — сервис Take It Down;
// message — готовый текст сообщения доверенному взрослому.
export type StepExtra = 'report' | 'takeItDown' | 'message';

// Шаг маршрута. text необязателен (у шага с message текста нет).
export interface RouteStep {
  title: Localized;
  text?: Localized;
  extra?: StepExtra;
}

// Пошаговый маршрут для ситуации.
export interface Route {
  id: SituationId;
  heading: Localized;
  lead?: Localized;
  steps: RouteStep[];
  note?: Localized;
  noteTone?: Tone;
}

// Контакт службы помощи.
export interface Contact {
  name: Localized;
  description: Localized;
  meta?: Localized;
  link?: string;
  needsInternet?: boolean;
}

// Экран «Это происходит прямо сейчас?».
export interface UrgentContent {
  title: Localized;
  lead: Localized;
  yes: Localized;
  yesSub: Localized;
  no: Localized;
  noSub: Localized;
  dunno: Localized;
  note: Localized;
}

// Экран «Что будет, когда ты позвонишь».
export interface CallItem {
  title: Localized;
  text: Localized;
}
export interface CallContent {
  title: Localized;
  items: CallItem[];
  source: Localized;
}

// Экран «Куда можно обратиться».
export interface ContactsContent {
  title: Localized;
  list: Contact[];
  foot: Localized;
}

// Экран «Как пожаловаться» с вкладками по площадкам.
export type ReportTab = 'Instagram' | 'Telegram' | 'TikTok' | 'other';
export interface ReportContent {
  title: Localized;
  tabs: Record<ReportTab, Localized[]>;
  otherLabel: Localized;
  note: Localized;
}

// Экран для взрослых.
export interface AdultDont {
  title: Localized;
  text: Localized;
}
export interface AdultContent {
  kicker: Localized;
  title: Localized;
  sayT: Localized;
  say: Localized[];
  dontT: Localized;
  dont: AdultDont[];
  nextT: Localized;
  next: Localized[];
  cta: Localized;
}

// Подписи интерфейса (объект T.ui из прототипа).
export interface UiContent {
  listen: Localized;
  stop: Localized;
  noVoice: Localized;
  back: Localized;
  homeTitle: Localized;
  homeLead: Localized;
  aiLabel: Localized;
  aiPh: Localized;
  aiGo: Localized;
  aiPrivacy: Localized;
  aiLike: Localized;
  aiOpen: Localized;
  aiSelf: Localized;
  aiMaybe: Localized;
  aiUnsure: Localized;
  aiEmpty: Localized;
  whoHelps: Localized;
  offline: Localized;
  adultBtn: Localized;
  report: Localized;
  afterCall: Localized;
  allHelp: Localized;
  helpline: Localized;
  helplineMeta: Localized;
  number: Localized;
  copyNum: Localized;
  copy: Localized;
  copied: Localized;
  copyFail: Localized;
  needNet: Localized;
}
