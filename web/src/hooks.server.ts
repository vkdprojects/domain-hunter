import { sequence } from '@sveltejs/kit/hooks';
import { caThemeHandle, createErrorHandler } from '@codeatlasdev/ui/kit';
import { theme } from '#lib/theme.js';

export const handle = sequence(caThemeHandle(theme));
export const handleError = createErrorHandler();
