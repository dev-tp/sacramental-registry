import { json } from '@sveltejs/kit';

import { deleteRecords, getRecords, parseSortableRecordColumns } from '$lib';

/** @type import('./$types').RequestHandler */
export async function DELETE(event) {
	const slice = /** @type string[] */ (await event.request.json());

	await deleteRecords(slice.map((id) => parseInt(id)));

	return json({ okay: true });
}

/** @type import('./$types').RequestHandler */
export async function GET(event) {
	const page = parseInt(event.url.searchParams.get('page') || '0');
	const sortedColumns = parseSortableRecordColumns(event.url);

	return json(await getRecords({ page, orderBy: sortedColumns.length > 0 ? sortedColumns : undefined }));
}
