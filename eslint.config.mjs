import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * Flat config. eslint-config-next 16 ships flat presets directly, so no
 * FlatCompat shim is needed (and the shim does not survive ESLint 10).
 */
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', '_source-media/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Unused values are almost always a leftover; a leading underscore marks
      // the deliberate ones.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];

export default config;
