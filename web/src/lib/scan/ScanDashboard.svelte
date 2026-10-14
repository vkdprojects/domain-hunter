<script lang="ts">
	import { EmptyState, GlassCard, Grid, KpiCard, PageShell, SimpleTable, StatusChip, ThemeToggle } from '@codeatlasdev/ui';
	import { CircleCheck, CircleX, Globe, SearchX } from '@lucide/svelte';
	import { copy } from '#lib/i18n.js';
	import type { ScanResult } from './types.js';

	let { results }: { results: ScanResult[] } = $props();

	const t = copy.dashboard;
	const available = $derived(results.filter((r) => r.status === 'available').length);
	const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
</script>

<PageShell title={t.title} description={t.description}>
	{#snippet actions()}
		<ThemeToggle />
	{/snippet}

	<Grid cols="repeat(auto-fill, minmax(160px, 1fr))" gap={12}>
		<KpiCard title={t.checked} value={results.length} icon={Globe} />
		<KpiCard title={t.available} value={available} icon={CircleCheck} />
		<KpiCard title={t.taken} value={results.length - available} icon={CircleX} />
	</Grid>

	<GlassCard full>
		{#if results.length === 0}
			<EmptyState icon={SearchX} title={t.emptyTitle} description={t.emptyDescription} />
		{:else}
			<SimpleTable>
				<thead>
					<tr><th>{t.domain}</th><th>{t.status}</th><th>{t.bestPrice}</th></tr>
				</thead>
				<tbody>
					{#each results as r (r.domain)}
						<tr>
							<td>{r.domain}</td>
							<td>
								<StatusChip
									status={r.status === 'available' ? 'success' : 'neutral'}
									label={r.status === 'available' ? t.available : t.taken}
								/>
							</td>
							<td>{r.price === undefined ? '–' : `${usd.format(r.price)} · ${r.registrar}`}</td>
						</tr>
					{/each}
				</tbody>
			</SimpleTable>
		{/if}
	</GlassCard>
</PageShell>
