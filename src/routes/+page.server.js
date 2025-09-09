import { desc, eq, sql } from 'drizzle-orm';

import { database } from '$lib/server/db';
import { record } from '$lib/server/db/schema';

/** @type import('./$types').PageServerLoad */
export async function load({ url }) {
	const query = database.select().from(record);

	const sort = url.searchParams
		.getAll('sort')
		.filter((column) => column in record)
		.join(',');

	if (sort) {
		query.orderBy(sql.raw(sort));
	} else {
		query.orderBy(desc(record.id));
	}

	query.limit(50);

	return {
		records: await query
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
