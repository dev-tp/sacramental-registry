import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { faker } from '@faker-js/faker/locale/en_US';

import * as schema from './schema.js';

/** @type typeof schema.record.$inferInsert[] */
const records = [];

const database = drizzle(new Database('./data.db'), { schema });
const today = new Date();

/** @type function(string, () => void): void */
function time(message, callback) {
	console.log(message);
	console.time();
	callback();
	console.timeEnd();
}

/** @type function(Date): string */
function getBaptismDate(dateOfBirth) {
	const INFANT_BAPTISM_AGE_LIMIT = 7;

	const baptism = faker.date.between({
		from: dateOfBirth,
		to: new Date(
			dateOfBirth.getFullYear() + INFANT_BAPTISM_AGE_LIMIT,
			dateOfBirth.getMonth(),
			dateOfBirth.getDate()
		)
	});

	return baptism.toISOString().substring(0, 10);
}

time('Generating records...', () => {
	faker.seed(19880208);

	for (let i = 0; i < 10_000; i++) {
		const sex = faker.person.sexType();
		const surname = faker.person.lastName();

		const dateOfBirth = faker.date.between({ from: '2002-09-02', to: today });

		records.push({
			firstName: faker.person.firstName(sex),
			middleName: faker.person.middleName(sex),
			surname,
			secondSurname: faker.person.lastName(),
			dateOfBirth: dateOfBirth.toISOString().substring(0, 10),
			father: faker.person.firstName('male') + ' ' + surname,
			mother: faker.person.firstName('female') + ' ' + surname,
			homeAddress: faker.location.streetAddress(),
			baptism: getBaptismDate(dateOfBirth)
		});
	}
});

time('Inserting records to database...', async () => {
	for (let i = 0; i < records.length; i += 100) {
		console.log(i, i + 100);
		await database.insert(schema.record).values(records.slice(i, i + 100));
	}
});
