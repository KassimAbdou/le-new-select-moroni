import '@testing-library/jest-dom/vitest';
import { beforeEach, vi } from 'vitest';

// Les tests d'interface vérifient les libellés français, indépendamment de la
// langue détectée par jsdom (souvent en-US).
beforeEach(() => {
  window.localStorage.setItem('lns-locale', 'fr');
});

// jsdom n'implémente pas scrollTo, utilisé par la navigation.
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});
