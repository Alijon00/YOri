import type { Situation } from './types';

// Ситуации на главном экране. Перенесено дословно из T.cats (reference/app.js),
// порядок сохранён.
export const situations: Situation[] = [
  {
    id: 'blackmail',
    title: {
      ru: 'Шантажируют или требуют деньги',
      tg: 'Шантаж мекунанд ё пул талаб мекунанд',
    },
    tone: 'warm',
  },
  {
    id: 'photos',
    title: {
      ru: 'Мои фото или данные выложили',
      tg: 'Акс ё маълумоти маро паҳн карданд',
    },
    tone: 'calm',
  },
  {
    id: 'bully',
    title: { ru: 'Меня травят в чате', tg: 'Дар чат маро таҳқир мекунанд' },
    tone: 'calm',
  },
  {
    id: 'stranger',
    title: {
      ru: 'Незнакомый взрослый пишет странное',
      tg: 'Калонсоли ношинос чизҳои аҷиб менависад',
    },
    tone: 'warm',
  },
  {
    id: 'hacked',
    title: { ru: 'Взломали мой аккаунт', tg: 'Аккаунти маро рахна карданд' },
    tone: 'calm',
  },
  {
    id: 'other',
    title: {
      ru: 'Другое / не знаю, как сказать',
      tg: 'Дигар / намедонам чӣ гӯям',
    },
    tone: 'calm',
  },
];
