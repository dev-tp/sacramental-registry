<script>
	import { SearchIcon } from '@lucide/svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	const filter = page.url.searchParams.get('filter');

	let value = $state(filter || '');
</script>

<form
	class="flex flex-row items-center gap-2 bg-gray-100 p-2 focus-within:bg-gray-200"
	onsubmit={(event) => {
		event.preventDefault();

		const searchParams = new URLSearchParams(page.url.searchParams);

		if (value !== '') {
			searchParams.set('filter', value);
		} else {
			searchParams.delete('filter');
		}

		goto(`?${searchParams.toString()}`);
	}}
>
	<SearchIcon class="ml-1 h-4 w-4" />
	<input
		bind:value
		class="w-full focus-within:outline-none"
		name="filter"
		placeholder="Search"
		type="text"
	/>
</form>
