<script>
	import { ArrowDown, ArrowUp } from '@lucide/svelte';
	import { onMount } from 'svelte';

	import { page } from '$app/state';

	/** @typedef {Object} Props
	 * @property {string} column
	 * @property {string} label
	 */

	/** @type Props */
	let { column, label } = $props();

	let href = $state(getHref(column, 0));
	let sortOrder = $state(0);

	/** @type function(string, number): string */
	function getHref(column, sortOrder) {
		switch (sortOrder) {
			case 1:
				return `?sort=${column}.asc`;
			case 2:
				return `?sort=${column}.desc`;
			default:
				return '/';
		}
	}

	onMount(() => {
		for (const parameter of page.url.searchParams.getAll('sort')) {
			const tokens = parameter.split('.');

			if (tokens.length !== 2 || column !== tokens[0]) {
				break;
			}

			if (tokens[1] === 'asc') {
				href = getHref(column, 1);
				sortOrder = 1;
			}

			if (tokens[1] === 'desc') {
				href = getHref(column, 2);
				sortOrder = 2;
			}
		}
	});
</script>

<th
	class="h-full hover:bg-gray-100"
	onclick={() => {
		sortOrder = (sortOrder + 1) % 3;
		href = getHref(column, sortOrder);
	}}
	tabindex="0"
>
	<a class="flex h-full items-center justify-between pr-2" data-sveltekit-preload-data="tap" {href}>
		<span>{label}</span>
		<div class="h-4 w-4">
			{#if sortOrder === 1}
				<ArrowDown class="h-full w-full" />
			{:else if sortOrder === 2}
				<ArrowUp class="h-full w-full" />
			{/if}
		</div>
	</a>
</th>
