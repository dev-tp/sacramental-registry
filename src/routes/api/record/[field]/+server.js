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
	const query = url.searchParams.get('q');

	return json(
		await database
			.selectDistinct({ [column]: record[column] })
			.from(record)
			.where(query ? like(record[column], `%${query.toLowerCase()}%`) : undefined)
			.orderBy(record[column])
			.limit(10)
	);
}
