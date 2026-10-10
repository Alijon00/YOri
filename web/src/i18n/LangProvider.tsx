// Провайдер и хуки языка намеренно живут в одном файле (по задаче W2).
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { Lang, Localized } from '../content/types';

// Ключ в localStorage для сохранённого выбора языка.
const STORAGE_KEY = 'yori-lang';

// Чтение сохранённого языка. Без localStorage — язык по умолчанию 'ru'.
function readStoredLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ru' || saved === 'tg') {
      return saved;
    }
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — не критично.
  }
  return 'ru';
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  // При смене языка обновляем <html lang>.
  useEffect(() => {
    document.documentElement.lang = lang === 'tg' ? 'tg' : 'ru';
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Запись недоступна — выбор просто не сохранится, приложение работает.
    }
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// Хук доступа к текущему языку и его смене.
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('useLang должен использоваться внутри LangProvider');
  }
  return ctx;
}

// Хук-переводчик: возвращает функцию t(), выбирающую строку текущего языка.
export function useT(): (localized: Localized) => string {
  const { lang } = useLang();
  return useCallback((localized: Localized) => localized[lang], [lang]);
}
