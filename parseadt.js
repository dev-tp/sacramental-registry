const adt = require('node_adt');
const fs = require('fs');

const parser = new adt();

parser.open('cathedral.adt', 'ISO-8859-1', function (error, table) {
  if (error) {
    return console.log(error);
  }

  // console.log(table.columns);
  console.log(table.header.recordCount);

  const logger = fs.createWriteStream('entries.txt', { flags: 'a' });

  table.eachRecord(function (error, record) {
    if (error) {
      return console.log(error);
    }

    const entry = {
      'first_name': record.FIRSTNAME,
      'last_name': record.SURNAME,
      'male': record.MALE,
      'female': record.FEMALE,
      'birthdate': record.BIRTHDATE,
      'birth_city': record.BIRTHCITY,
      'father': record.FATHER,
      'mother': record.MOTHER,
      'home_address_line_1': record.ADDRESS1,
      'home_address_line_2': record.ADDRESS2,
      'city': record.CITY,
      'state': record.STATE,
      'zip_code': record.ZIP,
      'baptism': record.BAPTDATE,
      'baptism_chrch': record.BAPTCHRCH,
      'communion': record.COMMDATE,
      'confirmation': record.CONFDATE,
      'wedding': record.WEDDATE,
      'profession_of_faith': record.PROFDATE,
      'death': record.BURYDATE,
      'baptism_key': record.BAPTKEY,
      'communion_key': record.COMMKEY,
      'confirmation_key': record.CONFKEY,
      'wedding_key': record.WEDDINGKEY,
      'weddng_2_key': record.WEDDNG2KEY,
      'profession_of_faith_key': record.PROFKEY,
      'death_key': record.DEATHKEY,
      'comments': record.REMARKS,
      // 'acceptance': record.ACCEPTANCE,
      // 'accptkey': record.ACCPTKEY,
      // 'bapdkey': record.BAPDKEY,
      // 'baptism': record.BAPTISM,
      // 'communion': record.COMMUNION,
      // 'confirmation': record.CONFIRMATI,
      // 'death': record.DEATH,
      // 'marriage': record.MARRIAGE,
      // 'marriage2': record.MARRIAGE2,
      // 'parish_code': record.PARISHCODE,
      // 'profofaith': record.PROFOFAITH,
    };

    logger.write(JSON.stringify(entry) + '\n');
  });
});
