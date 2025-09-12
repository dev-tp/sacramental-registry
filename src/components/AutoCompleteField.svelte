<script>
	/** @typedef {Object} Props
	 * @property {string} label
	 * @property {string} name
	 * @property {string} value
	 */

	/** @type Props */
	let { label, name, value = $bindable() } = $props();

	/** @type Promise<string[]> | string[] */
	let promise = $state([]);

	/** @type NodeJS.Timeout */
	let timeout;

	/** @type function(KeyboardEvent): void */
	function onkeyup(event) {
		if (event.key === 'Escape') {
			promise = [];
		}
	}

	/** @type function(): Promise<string[]> */
	async function fetchData() {
		const response = await fetch(`/api/record/${name}?q=${value}`);
		const json = await response.json();

		if (!(json instanceof Array)) {
			return [];
		}

		return json.map((item) => item[name]);
	}
</script>

<div>
	<label class="flex flex-col gap-1">
		{label}
		<input
			bind:value
			class="bg-gray-100 p-2 focus-within:bg-gray-200 focus-within:outline-none"
			oninput={() => {
				clearTimeout(timeout);
				timeout = setTimeout(() => (promise = fetchData()), 250);
			}}
			type="text"
			{name}
			{onkeyup}
		/>
	</label>
	<ul class="absolute max-h-48 w-full overflow-auto bg-white" tabindex="-1">
		{#await promise then results}
			{#each results as result}
				<li>
					<button
						class="w-full p-2 text-start focus:bg-blue-500"
						onclick={() => {
							promise = [];
							value = result;
						}}
						type="button"
						{onkeyup}
					>
						{result}
					</button>
				</li>
			{/each}
		{:catch}
			<li class="p-2">There was an error fetching data.</li>
		{/await}
	</ul>
</div>
