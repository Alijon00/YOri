import { describe, expect, it } from 'vitest';
import { ui } from './ui';
import { situations } from './situations';
import { routes, message } from './routes';
import { urgent } from './urgent';
import { call } from './call';
import { contacts } from './contacts';
import { report } from './report';
import { adult } from './adult';

// Весь контент в одном объекте — для рекурсивного обхода.
const allContent = {
  ui,
  situations,
  routes,
  message,
  urgent,
  call,
  contacts,
  report,
  adult,
};

// Локализованная строка — объект, у которого есть ключи ru и/или tg.
function looksLocalized(node: Record<string, unknown>): boolean {
  return typeof node.ru === 'string' || typeof node.tg === 'string';
}

// Рекурсивно обходит значение и для каждой Localized-строки проверяет,
// что оба языка заданы и непусты. Возвращает число проверенных строк.
function checkLocalized(node: unknown, path: string): number {
  let count = 0;

  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      count += checkLocalized(item, `${path}[${i}]`);
    });
    return count;
  }

  if (node !== null && typeof node === 'object') {
    const obj = node as Record<string, unknown>;

    if (looksLocalized(obj)) {
      expect(typeof obj.ru, `${path}.ru должен быть строкой`).toBe('string');
      expect(typeof obj.tg, `${path}.tg должен быть строкой`).toBe('string');
      expect(
        (obj.ru as string).trim().length,
        `${path}.ru не должен быть пустым`,
      ).toBeGreaterThan(0);
      expect(
        (obj.tg as string).trim().length,
        `${path}.tg не должен быть пустым`,
      ).toBeGreaterThan(0);
      count += 1;
    }

    // Обходим остальные ключи (кроме самих ru/tg).
    Object.entries(obj).forEach(([key, val]) => {
      if (key !== 'ru' && key !== 'tg') {
        count += checkLocalized(val, `${path}.${key}`);
      }
    });
  }

  return count;
}

describe('контент: двуязычность', () => {
  it('каждое поле Localized имеет непустые ru и tg', () => {
    const checked = checkLocalized(allContent, 'content');
    // Убеждаемся, что обход реально что-то нашёл.
    expect(checked).toBeGreaterThan(0);
  });
});

describe('контент: ситуации и маршруты', () => {
  it('у каждой ситуации есть маршрут', () => {
    situations.forEach((s) => {
      const route = routes.find((r) => r.id === s.id);
      expect(route, `маршрут для ситуации «${s.id}»`).toBeDefined();
    });
  });

  it('у каждого маршрута не меньше 2 шагов', () => {
    routes.forEach((r) => {
      expect(
        r.steps.length,
        `у маршрута «${r.id}» должно быть ≥2 шагов`,
      ).toBeGreaterThanOrEqual(2);
    });
  });
});
