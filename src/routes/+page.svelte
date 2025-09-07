<script>
	import { Plus } from '@lucide/svelte';

	import Modal from '../components/Modal.svelte';
	import TextField from '../components/TextField.svelte';

	/** @type Modal */
	let modal;

	/** @typedef {Object} Record
	 * @property {string} firstName
	 * @property {string} middleName
	 * @property {string} surname
	 * @property {string} secondSurname
	 * @property {string} dateOfBirth
	 * @property {string} homeAddress
	 * @property {string} mother
	 * @property {string} father
	 * @property {string} baptism
	 */

	/** @type Record */
	let selected = emptyRecord();
	let index = -1;

	/** @type Record[] */
	let records = [];

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
						index = -1;
						modal.show();
					}}
				>
					<Plus class="h-4 w-4" />
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
					<tr class="border-b border-gray-300 *:p-2">
						<th class="sticky left-0"><input type="checkbox" /></th>
						<th class="hover:bg-gray-100">First Name</th>
						<th class="hover:bg-gray-100">Middle Name</th>
						<th class="hover:bg-gray-100">Surname</th>
						<th class="hover:bg-gray-100">Second Surname</th>
						<th class="hover:bg-gray-100">Date of Birth</th>
						<th class="hover:bg-gray-100">Home Address</th>
						<th class="hover:bg-gray-100">Father</th>
						<th class="hover:bg-gray-100">Mother</th>
						<th class="hover:bg-gray-100">Baptism</th>
						<th class="sticky right-0"><button>...</button></th>
					</tr>
				</thead>
				<tbody>
					{#each records as record, i}
						<tr
							class="border-b border-gray-300 *:cursor-pointer *:p-2 last:border-none hover:bg-gray-100"
							onclick={() => {
								selected = { ...record };
								index = i;
								modal.show();
							}}
						>
							<th class="sticky left-0"><input type="checkbox" /></th>
							<td>{record.firstName}</td>
							<td>{record.middleName}</td>
							<td>{record.surname}</td>
							<td>{record.secondSurname}</td>
							<td>{record.dateOfBirth}</td>
							<td>{record.homeAddress}</td>
							<td>{record.father}</td>
							<td>{record.mother}</td>
							<td>{record.baptism}</td>
							<td class="sticky right-0"><button>View</button></td>
						</tr>
					{:else}
						<tr>
							<td class="py-8 text-center border-b border-gray-300" colspan="100">
								<p class="mb-2">No records found</p>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</main>
	<footer class="flex justify-between p-2">
		<p>Total items: 0</p>
	</footer>
</div>

<Modal
	bind:this={modal}
	onclose={() => {
		index = -1;
		selected = emptyRecord();
	}}
	onsubmit={(event) => {
		event.preventDefault();

		if (index === -1) {
			records = [...records, selected];
		} else {
			records = records.map((record, i) => (index === i ? selected : record));
		}

		modal.close();
	}}
>
	{#snippet header()}
		<div class="flex justify-between">
			{#if index > -1}
				<span>Edit record</span>
				<button type="button">...</button>
			{:else}
				Add new record
			{/if}
		</div>
	{/snippet}
	{#snippet content()}
		<div class="flex flex-col gap-2">
			<TextField label="Fisrt Name" bind:value={selected.firstName} />
			<TextField label="Middle Name" bind:value={selected.middleName} />
			<TextField label="Surname" bind:value={selected.surname} />
			<TextField label="Second Surname" bind:value={selected.secondSurname} />
			<TextField label="Date of Birth" bind:value={selected.dateOfBirth} />
			<TextField label="Home Address" bind:value={selected.homeAddress} />
			<TextField label="Father" bind:value={selected.father} />
			<TextField label="Mother" bind:value={selected.mother} />
			<TextField label="Baptism" bind:value={selected.baptism} />
		</div>
	{/snippet}
</Modal>
