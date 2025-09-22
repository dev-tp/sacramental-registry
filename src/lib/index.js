import { asc, desc, inArray, like, or } from 'drizzle-orm';

import { database } from './server/db';
import { record } from './server/db/schema';

/** @type function(number[]): Promise<void> */
export async function deleteRecords(ids) {
	await database.delete(record).where(inArray(record.id, ids));
}

/** @typedef {Object} QueryOptions
 * @property {string} [filter]
 * @property {number} [limit]
 * @property {import('drizzle-orm').SQL<unknown>[] | import('drizzle-orm').SQL<unknown>} [orderBy]
 * @property {number} [page]
 */

/** @typedef {typeof record.$inferSelect[]} Records */

/** @param {QueryOptions} [options]
 * @returns Promise<Records[]>
 */
export async function getRecords({ filter = '', limit = 50, orderBy, page = 0 } = {}) {
	/** @type import('drizzle-orm').SQL<unknown> | undefined */
	let where = undefined;

	if (filter !== '') {
		filter = `%${filter}%`;
		where = or(like(record.firstName, filter), like(record.surname, filter));
	}

	return database.query.record.findMany({
		limit,
		offset: page * limit,
		orderBy,
		where
	});
}

/** @type function(URL): import('drizzle-orm').SQL<unknown>[] */
export function parseSortableRecordColumns(url) {
	return url.searchParams
		.getAll('sort')
		.map((parameter) => {
			const tokens = parameter.split('.'); // should be in the shape of: record_column.sql_sort_func

			if (!(tokens[0] in record)) {
				return null;
			}

			const column = /** @type keyof typeof record.$inferInsert */ (tokens[0]);

			if (tokens[1] === 'desc') {
				return desc(record[column]);
			}

			return asc(record[column]);
		})
		.filter((parameter) => parameter !== null);
}
