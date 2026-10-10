import { afterEach, describe, expect, it, vi } from 'vitest';
import { classify } from './classify';
import type { Model } from './model';
// Модель импортируем из собранного файла (npm run build-model — до тестов).
import modelJson from '../../public/model.json';

const model = modelJson as unknown as Model;

describe('классификатор: ожидаемые метки', () => {
  const matchCases: Array<{ text: string; label: string }> = [
    {
      text: 'мне пишет какой-то дядя и просит фото, говорит никому не говорить',
      label: 'stranger',
    },
    {
      text: 'мне угрожают что разошлют фото если не заплачу',
      label: 'blackmail',
    },
    { text: 'в чате класса меня обзывают', label: 'bully' },
    { text: 'як ношинос менависад ва акс мепурсад', label: 'stranger' },
    {
      text: 'ба ман таҳдид мекунанд ва пул талаб мекунанд',
      label: 'blackmail',
    },
  ];

  it.each(matchCases)('«$text» → $label', ({ text, label }) => {
    const result = classify(text, model);
    expect(result.kind).toBe('match');
    if (result.kind === 'match') {
      expect(result.label).toBe(label);
    }
  });

  it('«мне грустно» → unsure', () => {
    expect(classify('мне грустно', model).kind).toBe('unsure');
  });
});

describe('классификатор: приватность', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('не вызывает fetch и не пишет в localStorage', () => {
    const fetchSpy = vi.fn();
    const setItemSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: setItemSpy,
      removeItem: vi.fn(),
    });

    classify('мне угрожают что разошлют фото если не заплачу', model);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
