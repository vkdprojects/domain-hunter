import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import axe from 'axe-core';
import ScanDashboard from './ScanDashboard.svelte';
import type { ScanResult } from './types';

const results: ScanResult[] = [
	{ domain: 'nexo.dev', status: 'available', price: 12.98, registrar: 'Porkbun' },
	{ domain: 'hivo.com', status: 'taken' },
	{ domain: 'zuno.io', status: 'available', price: 32.5, registrar: 'Cloudflare' }
];

async function expectNoAxeViolations(disabled: string[] = []) {
	const rules = Object.fromEntries(disabled.map((id) => [id, { enabled: false }]));
	const { violations } = await axe.run(document.body, { rules });
	expect(violations.map((v) => v.id)).toEqual([]);
}

describe('ScanDashboard', () => {
	it('counts available and taken domains', async () => {
		render(ScanDashboard, { results });
		await expect.element(page.getByText('Available', { exact: true }).first()).toBeVisible();
		const kpis = document.querySelectorAll('.ca-kpi__value');
		expect([...kpis].map((k) => k.textContent?.trim())).toEqual(['3', '2', '1']);
	});

	it('shows the cheapest price with its registrar for each available domain', async () => {
		render(ScanDashboard, { results });
		await expect.element(page.getByRole('row', { name: /nexo\.dev/ })).toHaveTextContent(
			/\$12\.98.*Porkbun/
		);
		await expect.element(page.getByRole('row', { name: /hivo\.com/ })).toHaveTextContent('Taken');
		await expectNoAxeViolations();
	});

	it('shows an empty state when nothing was scanned', async () => {
		render(ScanDashboard, { results: [] });
		await expect.element(page.getByText('No scans yet')).toBeVisible();
		// EmptyState hardcodes its title as <h5> (@codeatlasdev/ui 2.1.1), which skips levels under PageShell's <h1>.
		await expectNoAxeViolations(['heading-order']);
	});
});
