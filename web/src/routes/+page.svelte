<script lang="ts">
	import ScanDashboard from '#lib/scan/ScanDashboard.svelte';
	import { sampleResults } from '#lib/scan/sample.js';
</script>

<svelte:head><title>domh</title></svelte:head>

<ScanDashboard results={sampleResults} />
