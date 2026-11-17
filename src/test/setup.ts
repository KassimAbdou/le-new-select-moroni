import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom n'implémente pas scrollTo, utilisé par la navigation.
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});
