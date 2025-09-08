import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const record = sqliteTable('record', {
	id: integer('id').primaryKey(),
	firstName: text('first_name'),
	middleName: text('middle_name'),
	surname: text('surname'),
	secondSurname: text('second_surname'),
	dateOfBirth: text('date_of_birth'),
	homeAddress: text('home_address'),
	mother: text('mother'),
	father: text('father'),
	baptism: text('baptism')
});
