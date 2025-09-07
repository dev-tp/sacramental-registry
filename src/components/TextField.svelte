<script>
	/** @typedef {Object} Props
	 * @property {string} label
	 * @property {string} value
	 */

	/** @type Props */
	let { label, value = $bindable() } = $props();
</script>

<label class="flex flex-col gap-1">
	{label}
	<input
		bind:value
		class="bg-gray-100 p-2 focus-within:bg-gray-200 focus-within:outline-none"
		type="text"
	/>
</label>
