<script>
	/** @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 * @property {string} label
	 */

	/** @type Props */
	const { children, label } = $props();

	let isActive = $state(false);
</script>

<div
	onfocusout={(event) => {
		if (
			event.relatedTarget instanceof HTMLElement &&
			event.currentTarget.contains(event.relatedTarget)
		) {
			return;
		}

		isActive = false;
	}}
>
	<button onclick={() => (isActive = !isActive)}>
		{label}
	</button>
	{#if isActive}
		<div class="absolute right-2 bg-white shadow">
			{@render children?.()}
		</div>
	{/if}
</div>
