<script lang="ts">
	import '@codeatlasdev/ui/styles/global.css';
	import { colorScheme } from '@codeatlasdev/ui';
	import { onMount } from 'svelte';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	onMount(() => colorScheme.init());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
