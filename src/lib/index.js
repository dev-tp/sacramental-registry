import { database } from './server/db';
import { record } from './server/db/schema';

/** @typedef {Object} QueryOptions
 * @property {number} [limit]
 * @property {import('drizzle-orm').SQL<unknown>[] | import('drizzle-orm').SQL<unknown>} [orderBy]
 * @property {number} [page]
 */

/** @typedef {typeof record.$inferSelect[]} Records */

/** @param {QueryOptions} [options]
 * @returns Records[]
 */
export async function getRecords({ limit = 50, orderBy, page = 0 } = {}) {
	return await database.query.record.findMany({
		limit,
		offset: page * limit,
		orderBy
	});
}
