// Тип модели наивного Байеса (web/public/model.json).
// Схема — строго по CLAUDE.md. Сейчас модель генерирует временный TS-скрипт
// (web/scripts/build-model.ts), позже — C#-часть.

import type { SituationId } from '../content/types';

// Метки совпадают с идентификаторами ситуаций.
export type Label = SituationId;

// Порядок меток фиксирован (как в CLAUDE.md).
export const labels: Label[] = [
  'blackmail',
  'photos',
  'bully',
  'stranger',
  'hacked',
  'other',
];

export interface Model {
  version: string;
  labels: Label[];
  logPriors: Record<Label, number>;
  logLikelihoods: Record<Label, Record<string, number>>;
  logUnseen: Record<Label, number>;
  thresholds: { minConfidence: number; minMargin: number };
  // trainSize — число псевдо-документов; accuracy временной модели не меряем.
  metrics: { trainSize: number; accuracy: number | null };
}
