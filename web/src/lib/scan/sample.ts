import type { ScanResult } from './types';

/** Fixture shown until the page is wired to `domh serve` (issue #3). */
export const sampleResults: ScanResult[] = [
	{ domain: 'nexo.dev', status: 'available', price: 12.98, registrar: 'Porkbun' },
	{ domain: 'nexo.com', status: 'taken' },
	{ domain: 'hivo.io', status: 'available', price: 32.5, registrar: 'Cloudflare' },
	{ domain: 'zuno.app', status: 'available', price: 14.2, registrar: 'Namecheap' },
	{ domain: 'tevo.com', status: 'taken' }
];
