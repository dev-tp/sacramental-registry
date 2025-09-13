import { asc, count, desc, eq } from 'drizzle-orm';

import { database } from '$lib/server/db';
import { getRecords } from '$lib';
import { record } from '$lib/server/db/schema';

/** @type import('./$types').PageServerLoad */
export async function load({ url }) {
	const sortedColumns = url.searchParams
		.getAll('sort')
		.map((parameter) => {
			const tokens = parameter.split('.');

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

	return {
		records: await getRecords({ orderBy: sortedColumns ? sortedColumns : desc(record.id) }),
		recordsCount: (await database.select({ count: count() }).from(record))[0].count
	};
}

/** @type function(FormDataEntryValue | null): string */
function unwrapFormDataEntryValue(value) {
	if (!value) {
		return '';
	}
	return value.toString();
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		await database
			.delete(record)
			.where(eq(record.id, parseInt(unwrapFormDataEntryValue(formData.get('id')))));
	},
	save: async ({ request }) => {
		const formData = await request.formData();
		const id = parseInt(unwrapFormDataEntryValue(formData.get('id')));

		const data = {
			firstName: unwrapFormDataEntryValue(formData.get('firstName')),
			middleName: unwrapFormDataEntryValue(formData.get('middleName')),
			surname: unwrapFormDataEntryValue(formData.get('surname')),
			secondSurname: unwrapFormDataEntryValue(formData.get('secondSurname')),
			dateOfBirth: unwrapFormDataEntryValue(formData.get('dateOfBirth')),
			homeAddress: unwrapFormDataEntryValue(formData.get('homeAddress')),
			mother: unwrapFormDataEntryValue(formData.get('mother')),
			father: unwrapFormDataEntryValue(formData.get('father')),
			baptism: unwrapFormDataEntryValue(formData.get('baptism'))
		};

		if (id) {
			await database.update(record).set(data).where(eq(record.id, id));
		} else {
			await database.insert(record).values(data);
		}
	}
};
