import { error, json } from '@sveltejs/kit';
import { like } from 'drizzle-orm';

import { database } from '$lib/server/db';
import { record } from '$lib/server/db/schema';

/** @type import('./$types').RequestHandler */
export async function GET({ params, url }) {
	if (!(params.field in record) || params.field === 'id') {
		return error(404, { message: 'Not a valid record column' });
	}

	const column = /** @type keyof typeof record.$inferInsert */ (params.field);
	const term = url.searchParams.get('q');

	return json(
		await database.query.record.findMany({
			columns: { [column]: true },
			limit: 10,
			orderBy: record[column],
			where: term ? like(record[column], `%${term.toLowerCase()}%`) : undefined
		})
	);
}
