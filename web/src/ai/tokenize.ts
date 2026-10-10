// Токенизатор. Один и тот же алгоритм в TS и в будущей C#-части; проверяется
// примерами из data/tokenizer-cases.json.
//
// Шаги (строго по CLAUDE.md):
//   1. привести к нижнему регистру; «ё» → «е»;
//   2. разбить по всему, что не буква Unicode (/[^\p{L}]+/u);
//   3. отбросить слова короче 2 букв;
//   4. каждое слово обрезать до первых 5 букв;
//   5. добавить биграммы соседних обрезанных слов в виде «a_b».
export function tokenize(text: string): string[] {
  const normalized = text.toLowerCase().replace(/ё/g, 'е');

  const words = normalized
    .split(/[^\p{L}]+/u)
    .filter((word) => word.length >= 2) // короче 2 букв — отбрасываем
    .map((word) => word.slice(0, 5)); // обрезаем до первых 5 букв

  const tokens: string[] = [...words];

  // Биграммы соседних обрезанных слов. Идём парами, без индексов, чтобы
  // не спотыкаться о строгую проверку индексации массива.
  let prev: string | null = null;
  for (const word of words) {
    if (prev !== null) {
      tokens.push(`${prev}_${word}`);
    }
    prev = word;
  }

  return tokens;
}
