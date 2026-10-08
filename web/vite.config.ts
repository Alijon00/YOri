/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Базовый путь './' — сборка работает на любом статическом хостинге,
// в том числе при открытии из подпапки. Маршрутизация — через HashRouter.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    // Юнит-тесты (пока токенизатора нет) не требуют DOM.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
