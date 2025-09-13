<script>
	import { ArrowRight, Plus, Trash } from '@lucide/svelte';

	import AutoCompleteField from '../components/AutoCompleteField.svelte';
	import Modal from '../components/Modal.svelte';
	import SortableHeader from '../components/SortableHeader.svelte';
	import TextField from '../components/TextField.svelte';

	/** @type {import('./$types').PageProps} */
	const { data } = $props();

	/** @type Modal */
	let modal;

	/** @type number */
	let page = $state(1);

	/** @type Record[] */
	let records = $state(data.records);

	/** @typedef {typeof import('$lib/server/db/schema').record.$inferInsert} Record */
	/** @type Record */
	let selected = $state(emptyRecord());

	/** @type function(): Record */
	function emptyRecord() {
		return {
			firstName: '',
			middleName: '',
			surname: '',
			secondSurname: '',
			dateOfBirth: '',
			homeAddress: '',
			mother: '',
			father: '',
			baptism: ''
		};
	}
</script>

<div class="flex h-screen flex-col">
	<main class="grow">
		<div class="m-2">
			<header class="mb-2 flex justify-between">
				<h1 class="content-center">Sacramental Registry</h1>
				<button
					class="flex items-center gap-2 border bg-black px-4 py-2 text-white"
					onclick={() => {
						selected = emptyRecord();
						modal.show();
					}}
				>
					<Plus class="h-5 w-5" />
					New Record
				</button>
			</header>
			<form class="flex">
				<input
					class="w-full bg-gray-100 p-2 focus-within:bg-gray-200 focus-within:outline-none"
					type="text"
					placeholder="Search"
				/>
			</form>
		</div>
		<div class="overflow-auto">
			<table class="min-w-full">
				<thead>
					<tr class="h-12 border-b border-gray-300 *:whitespace-nowrap">
						<th class="sticky left-0 px-2"><input type="checkbox" /></th>
						<SortableHeader column="firstName" label="First Name" />
						<SortableHeader column="middleName" label="Middle Name" />
						<SortableHeader column="surname" label="Surname" />
						<SortableHeader column="secondSurname" label="Second Surname" />
						<SortableHeader column="dateOfBirth" label="Date of Birth" />
						<SortableHeader column="homeAddress" label="Home Address" />
						<SortableHeader column="father" label="Father" />
						<SortableHeader column="mother" label="Mother" />
						<SortableHeader column="baptism" label="Baptism" />
						<th class="sticky right-0"><button>...</button></th>
					</tr>
				</thead>
				<tbody>
					{#each records as record}
						<tr
							class="h-12 border-b border-gray-300 *:cursor-pointer *:whitespace-nowrap last:border-none hover:bg-gray-100"
							onclick={() => {
								selected = record;
								modal.show();
							}}
						>
							<th class="sticky left-0 px-2">
								<input onclick={(event) => event.stopPropagation()} type="checkbox" />
							</th>
							<td>{record.firstName}</td>
							<td>{record.middleName}</td>
							<td>{record.surname}</td>
							<td>{record.secondSurname}</td>
							<td>{record.dateOfBirth}</td>
							<td>{record.homeAddress}</td>
							<td>{record.father}</td>
							<td>{record.mother}</td>
							<td>{record.baptism}</td>
							<td class="sticky right-0"><button><ArrowRight class="h-4 w-4" /></button></td>
						</tr>
					{:else}
						<tr>
							<td class="py-8 text-center border-b border-gray-300" colspan="100">
								<p class="mb-2">No records found</p>
							</td>
						</tr>
					{/each}
					<tr class="h-16">
						<td class="text-center" colspan="100">
							<button
								class="bg-black px-4 py-2 text-white"
								onclick={async () => {
									const response = await fetch(`/api/records?page=${page}`);
									const json = /** @type Record[] */ (await response.json());

									for (const record of json) {
										records.push(record);
									}

									page = page + 1;
								}}
							>
								Load more
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</main>
	<footer class="flex justify-between p-2">
		<p>Total items: {records.length}</p>
	</footer>
</div>

<Modal bind:this={modal}>
	{#snippet header()}
		<div class="flex justify-between">
			{#if selected.id !== undefined}
				<h2>Edit record</h2>
				<form
					action="?/delete"
					method="POST"
					onsubmit={(event) => {
						event.preventDefault();

						if (!(event.target instanceof HTMLFormElement)) {
							return;
						}

						if (confirm('Are you sure you want to delete this entry?')) {
							event.target.submit();
						}
					}}
				>
					<input name="id" type="hidden" value={selected.id} />
					<button><Trash class="h-4 w-4 text-red-500" /></button>
				</form>
			{:else}
				<h2>Add new record</h2>
			{/if}
		</div>
	{/snippet}
	{#snippet content()}
		<form id="records-form" action="?/save" class="flex flex-col gap-2" method="POST">
			<AutoCompleteField label="First Name" name="firstName" value={selected.firstName || ''} />
			<TextField label="Middle Name" name="middleName" value={selected.middleName || ''} />
			<TextField label="Surname" name="surname" value={selected.surname || ''} />
			<TextField label="Second Surname" name="secondSurname" value={selected.secondSurname || ''} />
			<TextField label="Date of Birth" name="dateOfBirth" value={selected.dateOfBirth || ''} />
			<TextField label="Home Address" name="homeAddress" value={selected.homeAddress || ''} />
			<TextField label="Father" name="father" value={selected.father || ''} />
			<TextField label="Mother" name="mother" value={selected.mother || ''} />
			<TextField label="Baptism" name="baptism" value={selected.baptism || ''} />
			{#if selected.id !== undefined}
				<input type="hidden" name="id" value={selected.id} />
			{/if}
		</form>
	{/snippet}
	{#snippet footer()}
		<div class="flex justify-end gap-2">
			<button class="px-4 py-2" onclick={() => modal.close()} type="button">Cancel</button>
			<button form="records-form" class="bg-black px-4 py-2 text-white" type="submit">Save</button>
		</div>
	{/snippet}
</Modal>
