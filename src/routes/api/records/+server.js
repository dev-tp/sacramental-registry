import { json } from '@sveltejs/kit';

import { getRecords } from '$lib';

/** @type import('./$types').RequestHandler */
export async function GET(event) {
	const page = parseInt(event.url.searchParams.get('page') || '0');
	return json(await getRecords({ page }));
}
