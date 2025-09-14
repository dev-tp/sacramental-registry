import { json } from '@sveltejs/kit';

import { deleteRecords, getRecords } from '$lib';

/** @type import('./$types').RequestHandler */
export async function DELETE(event) {
	const slice = /** @type string[] */ (await event.request.json());

	await deleteRecords(slice.map((id) => parseInt(id)));

	return json({ okay: true });
}

/** @type import('./$types').RequestHandler */
export async function GET(event) {
	const page = parseInt(event.url.searchParams.get('page') || '0');
	return json(await getRecords({ page }));
}
