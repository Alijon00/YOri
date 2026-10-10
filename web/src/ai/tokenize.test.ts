import { describe, expect, it } from 'vitest';
import { tokenize } from './tokenize';
// Примеры лежат в /data и будут использоваться также C#-частью — импортируем
// тот же файл, а не дублируем его в тесте.
import casesJson from '../../../data/tokenizer-cases.json';

interface TokenizerCase {
  input: string;
  tokens: string[];
}

const cases = casesJson as TokenizerCase[];

describe('токенизатор', () => {
  it('в наборе не меньше 12 примеров', () => {
    expect(cases.length).toBeGreaterThanOrEqual(12);
  });

  it.each(cases)('«$input»', ({ input, tokens }) => {
    expect(tokenize(input)).toEqual(tokens);
  });
});
