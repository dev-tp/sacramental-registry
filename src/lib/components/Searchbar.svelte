<script>
	import { SearchIcon } from '@lucide/svelte';

	let value = $state('');
</script>

<form
	class="flex flex-row items-center gap-2 bg-gray-100 p-2 focus-within:bg-gray-200"
	onsubmit={(event) => {
		event.preventDefault();
		console.log(value);
	}}
>
	<SearchIcon class="ml-1 h-4 w-4" />
	<input bind:value class="w-full focus-within:outline-none" placeholder="Search" type="text" />
</form>
