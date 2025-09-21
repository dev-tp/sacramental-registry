import { count, desc, eq, like, or } from 'drizzle-orm';

import { database } from '$lib/server/db';
import { deleteRecords, getRecords, parseSortableRecordColumns } from '$lib';
import { record } from '$lib/server/db/schema';

/** @type import('./$types').PageServerLoad */
export async function load(event) {
	const sortedColumns = parseSortableRecordColumns(event.url);

	/** @type import('drizzle-orm').SQL<unknown> | undefined */
	let where = undefined;

	const filter = event.url.searchParams.get('filter');

	if (filter) {
		const query = `%${filter}%`;
		where = or(like(record.firstName, query), like(record.surname, query));
	}

	return {
		records: await getRecords({
			orderBy: sortedColumns.length > 0 ? sortedColumns : desc(record.id),
			where
		}),
		recordsCount: (await database.select({ count: count() }).from(record).where(where))[0].count
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
		const id = parseInt(unwrapFormDataEntryValue(formData.get('id')));
		deleteRecords([id]);
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
