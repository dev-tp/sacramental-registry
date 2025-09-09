import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const record = sqliteTable('record', {
	id: integer().primaryKey(),
	firstName: text(),
	middleName: text(),
	surname: text(),
	secondSurname: text(),
	dateOfBirth: text(),
	homeAddress: text(),
	mother: text(),
	father: text(),
	baptism: text()
});
