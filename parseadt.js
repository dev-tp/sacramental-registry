const adt = require('node_adt');
const fs = require('fs');

const types = {
  // 1: 'LOGICAL',
  1: 'TINYINT',
  // 4: 'CHARACTER',
  4: 'VARCHAR',
  5: 'TEXT',
  20: 'CICHARACTER',
  26: 'NCHAR',
  10: 'DOUBLE',
  // 11: 'INTEGER',
  11: 'INT',
  15: 'AUTOINCREMENT',
  12: 'SHORT',
  3: 'DATE',
  13: 'TIME',
  14: 'TIMESTAMP',
};

function adtToCsv(filename) {
  const sqlFilename = `${filename}.sql`;
  const parser = new adt();

  parser.open(`${filename}.ADT`, 'ISO-8859-1', function (error, table) {
    if (error) {
      throw error;
    }

    const tableName = filename.toLowerCase();

    fs.writeFileSync(sqlFilename, `CREATE TABLE ${tableName} (\n`);
    fs.appendFileSync(sqlFilename, '  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,\n');

    fs.appendFileSync(sqlFilename, table.columns.map(function (column) {
      if (column.type != 4) {
        return `  ${column.name.toLowerCase()} ${types[column.type]}`;
      } else {
        const length = column.length % 2 == 1 ? column.length + 1 : column.length;
        return `  ${column.name.toLowerCase()} ${types[column.type]}(${length})`;
      }
    }).join(',\n'));

    fs.appendFileSync(sqlFilename, '\n);\n\n');

    const columnNames = table.columns.map(column => column.name);

    let count = 0;

    table.eachRecord(function (error, record) {
      if (error) {
        throw error;
      }

      const values = columnNames.map(function (columnName) {
        if (columnName.toLowerCase().includes('date') && record[columnName] != null) {
          record[columnName].setDate(record[columnName].getDate() + 1);

          const date = [
            record[columnName].getFullYear(),
            record[columnName].getMonth() + 1,
            record[columnName].getDate(),
          ];

          date[1] = date[1] < 10 ? '0' + date[1] : date[1];
          date[2] = date[2] < 10 ? '0' + date[2] : date[2];

          record[columnName] = date.join('-');
        }

        return JSON.stringify(record[columnName]);
      }).join(', ');

      fs.appendFileSync(sqlFilename, `INSERT INTO ${tableName} VALUES (${++count}, ${values});\n`);
    });
  });
}

if (process.argv.length > 2) {
  adtToCsv(process.argv[2].split('.')[0]);
}
