<script>
	import { ArrowDown, ArrowUp } from '@lucide/svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	/** @typedef {Object} Props
	 * @property {string} column
	 * @property {string} label
	 */

	/** @type Props */
	let { column, label } = $props();

	let order = $state('');

	const entries = Object.fromEntries(
		page.url.searchParams.getAll('sort').map((entry) => entry.split('.'))
	);

	if (entries[column] === 'asc') {
		order = 'asc';
	} else if (entries[column] === 'desc') {
		order = 'desc';
	} else {
		order = '';
	}
</script>

<th
	class="h-full cursor-pointer hover:bg-gray-100"
	onclick={async () => {
		const entries = Object.fromEntries(
			page.url.searchParams.getAll('sort').map((entry) => entry.split('.'))
		);

		if (!entries[column]) {
			entries[column] = 'asc';
			order = 'asc';
		} else if (entries[column] === 'asc') {
			entries[column] = 'desc';
			order = 'desc';
		} else if (entries[column] === 'desc') {
			delete entries[column];
			order = '';
		}

		page.url.searchParams.delete('sort');

		for (const entry in entries) {
			page.url.searchParams.append('sort', `${entry}.${entries[entry]}`);
		}

		await goto(page.url, { invalidateAll: true });
	}}
>
	<div class="flex h-full items-center justify-between px-2">
		<span>{label}</span>
		<div class="h-4 w-4">
			{#if order === 'asc'}
				<ArrowDown class="h-full w-full" />
			{:else if order === 'desc'}
				<ArrowUp class="h-full w-full" />
			{/if}
		</div>
	</div>
</th>
