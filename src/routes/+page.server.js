import { count, desc, eq } from 'drizzle-orm';

import { database } from '$lib/server/db';
import { getRecords, parseSortableRecordColumns } from '$lib';
import { record } from '$lib/server/db/schema';

/** @type import('./$types').PageServerLoad */
export async function load(event) {
	const filter = event.url.searchParams.get('filter') || '';
	const sortedColumns = parseSortableRecordColumns(event.url);

	return {
		records: await getRecords({
			filter,
			orderBy: sortedColumns.length > 0 ? sortedColumns : desc(record.id)
		}),
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
