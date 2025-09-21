<script>
	/** @typedef {Object} Props
	 * @property {import('svelte').Snippet} content
	 * @property {import('svelte').Snippet} [footer]
	 * @property {import('svelte').Snippet} [header]
	 * @property {function(): void} [onclose]
	 */

	/** @type Props */
	let { content, footer, header, onclose } = $props();

	let isActive = $state(false);

	export function close() {
		if (onclose) {
			onclose();
		}
		isActive = false;
	}

	export function show() {
		isActive = true;
	}
</script>

{#if isActive}
	<div class="fixed inset-0 z-20 bg-black/50"></div>
	<div class="fixed top-0 right-0 bottom-0 z-20 w-1/2 overflow-auto bg-white">
		<div class="sticky top-0 bg-inherit p-4">
			{@render header?.()}
		</div>
		<div class="px-4">
			{@render content()}
		</div>
		<div class="sticky bottom-0 bg-inherit p-4">
			{@render footer?.()}
		</div>
	</div>
{/if}
