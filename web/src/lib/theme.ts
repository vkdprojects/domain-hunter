import type { ThemeOptions } from '@codeatlasdev/ui';

/** Single theme for the hook, the Vite plugin and any future integration. */
export const theme: ThemeOptions = {
	presets: [{ id: 'domh', color: '#2563eb', label: 'domh' }],
	defaultPreset: 'domh',
	defaultScheme: 'system'
};
