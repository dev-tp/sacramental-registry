<script>
	/** @typedef {Object} Props
	 * @property {import('svelte').Snippet} content
	 * @property {import('svelte').Snippet} [header]
	 * @property {function(): void} [onclose]
	 * @property {function(SubmitEvent): void} onsubmit
	 */

	/** @type Props */
	let { content, header, onclose, onsubmit } = $props();

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

	/** @type function(KeyboardEvent): void */
	function handleKeyUp(event) {
		if (event.key === 'Escape') {
			close();
		}
	}

	$effect(() => {
		if (isActive) {
			document.addEventListener('keyup', handleKeyUp);
		} else {
			document.removeEventListener('keyup', handleKeyUp);
		}
	});
</script>

{#if isActive}
	<div>
		<div class="fixed inset-0 bg-black/50"></div>
		<form class="fixed top-0 right-0 bottom-0 w-1/2 overflow-auto bg-white" {onsubmit}>
			<div class="sticky top-0 bg-inherit p-4">
				{@render header?.()}
			</div>
			<div class="px-4">
				{@render content()}
			</div>
			<div class="sticky bottom-0 flex justify-end gap-2 bg-inherit p-4">
				<button class="px-2 py-1" onclick={() => (isActive = false)} type="button">Cancel</button>
				<button class="bg-black px-2 py-1 text-white" type="submit">Save</button>
			</div>
		</form>
	</div>
{/if}
