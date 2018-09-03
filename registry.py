# -*- coding: utf-8 -*-

import csv
import json
import os

with open('entries.txt', 'r') as input_file:
    with open('entries.json', 'w') as output_file:
        output_file.write('{\n')
        output_file.write('  "data": [\n')
        output_file.write(',\n'.join([line.rstrip() for line in input_file.readlines()]))
        output_file.write('\n  ]\n')
        output_file.write('}\n')

os.remove('entries.txt')

# TODO Replace \ with lambda. One entry does not align with columns
with open('entries.json', 'r') as input_file:
    with open('registry.csv', 'w') as output_file:
        csv_writer = csv.writer(output_file)

        keys = [
            'first_name', 'last_name', 'male', 'female', 'birthdate',
            'birth_city', 'father', 'mother', 'home_address_line_1',
            'home_address_line_2', 'city', 'state', 'zip_code', 'baptism',
            'baptism_chrch', 'communion', 'confirmation', 'wedding',
            'profession_of_faith', 'death', 'baptism_key', 'communion_key',
            'confirmation_key', 'wedding_key', 'weddng_2_key',
            'profession_of_faith_key', 'death_key', 'comments'
        ]

        csv_writer.writerow(keys)

        for entry in json.loads(input_file.read())['data']:
            values = [unicode(entry[key]).encode('utf-8') for key in keys]
            csv_writer.writerow(values)

os.remove('entries.json')

with open('registry.sql', 'w') as output_file:
    output_file.write('USE sacramental_registry;\n')
    output_file.write('\n-- DROP TABLE registry;\n')
    output_file.write('\nCREATE TABLE registry (\n')
    output_file.write('  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,\n')
    output_file.write('  first_name VARCHAR(255) NOT NULL,\n')
    output_file.write('  last_name VARCHAR(255) NOT NULL,\n')
    output_file.write('  sex ENUM(\'Female\', \'Male\') NOT NULL,\n')
    output_file.write('  birthdate DATE,\n')
    output_file.write('  birth_city VARCHAR(255) NOT NULL,\n')
    output_file.write('  father VARCHAR(255),\n')
    output_file.write('  mother VARCHAR(255),\n')
    output_file.write('  home_address_line_1 VARCHAR(255) NOT NULL,\n')
    output_file.write('  home_address_line_2 VARCHAR(255),\n')
    output_file.write('  city VARCHAR(255) NOT NULL,\n')
    output_file.write('  region CHAR(2) NOT NULL,\n')
    output_file.write('  zip_code VARCHAR(10) NOT NULL,\n')
    output_file.write('  baptism DATE,\n')
    output_file.write('  baptism_church VARCHAR(255),\n')
    output_file.write('  communion DATE,\n')
    output_file.write('  confirmation DATE,\n')
    output_file.write('  wedding DATE,\n')
    output_file.write('  profession_of_faith DATE,\n')
    output_file.write('  death DATE,\n')
    output_file.write('  baptism_key INT,\n')
    output_file.write('  communion_key INT,\n')
    output_file.write('  confirmation_key INT,\n')
    output_file.write('  wedding_key INT,\n')
    output_file.write('  profession_of_faith_key INT,\n')
    output_file.write('  death_key INT,\n')
    output_file.write('  comments TEXT,\n')
    output_file.write('  date_entered DATETIME DEFAULT current_timestamp()\n')
    output_file.write(') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n\n')

    # output_file.write('INSERT INTO registry (first_name, last_name, sex, birthdate, birth_city, father, mother, home_address_line_1, home_address_line_2, city, region, zip_code, baptism, baptism_church, communion, confirmation, wedding, profession_of_faith, death, baptism_key, communion_key, confirmation_key, wedding_key, profession_of_faith_key, death_key, comments, date_entered) VALUES\n')
    insert_statement = 'INSERT INTO registry (first_name, last_name, sex, birthdate, birth_city, father, mother, home_address_line_1, home_address_line_2, city, region, zip_code, baptism, baptism_church, communion, confirmation, wedding, profession_of_faith, death, baptism_key, communion_key, confirmation_key, wedding_key, profession_of_faith_key, death_key, comments, date_entered) VALUES '

    with open('registry.csv', 'r') as input_file:
        header = False

        for line in csv.reader(input_file):
            if not header:
                header = True
                continue

            values = []

            values.append('"%s"' % line[0]) # first_name
            values.append('"%s"' % line[1]) # last_name
            values.append('"%s"' % ('Male' if line[2] == 'True' else 'Female')) # sex
            values.append('"%s"' % line[4][:10] if line[4] != 'None' else 'null') # birthdate
            values.append('"%s"' % line[5]) # birth_city
            values.append('"%s"' % line[6] if line[6] != '' and line[6] != 'None' else 'null') # father
            values.append('"%s"' % line[7] if line[7] != '' and line[7] != 'None' else 'null') # mother
            values.append('"%s"' % line[8].replace('"', '\\"')) # home_address_line_1
            values.append('"%s"' % line[9] if line[9] != '' and line[9] != 'None' else 'null') # home_address_line_2
            values.append('"%s"' % line[10]) # city
            values.append('"%s"' % line[11].upper()) # region
            values.append('"%s"' % line[12]) # zip_code
            values.append('"%s"' % line[13][:10] if line[13] != '' and line[13] != 'None' else 'null') # baptism
            values.append('"%s"' % line[14] if line[14] != '' and line[14] != 'None' else 'null') # baptism_church
            values.append('"%s"' % line[15][:10] if line[15] != '' and line[15] != 'None' else 'null') # communion
            values.append('"%s"' % line[16][:10] if line[16] != '' and line[16] != 'None' else 'null') # confirmation
            values.append('"%s"' % line[17][:10] if line[17] != '' and line[17] != 'None' else 'null') # wedding
            values.append('"%s"' % line[18][:10] if line[18] != '' and line[18] != 'None' else 'null') # profession_of_faith
            values.append('"%s"' % line[19][:10] if line[19] != '' and line[19] != 'None' else 'null') # death
            values.append('%s' % line[20] if line[20] != '0' and line[20] != 'None' else 'null') # baptism_key
            values.append('%s' % line[21] if line[21] != '0' and line[21] != 'None' else 'null') # baptism_church_key
            values.append('%s' % line[22] if line[22] != '0' and line[22] != 'None' else 'null') # communion_key
            values.append('%s' % line[23] if line[23] != '0' and line[23] != 'None' else 'null') # confirmation_key
            values.append('%s' % line[24] if line[24] != '0' and line[24] != 'None' else 'null') # wedding_key
            values.append('%s' % line[25] if line[25] != '0' and line[25] != 'None' else 'null') # profession_of_faith_key
            values.append('%s' % line[26] if line[26] != '0' and line[26] != 'None' else 'null') # death_key
            values.append('null')

            # output_file.write('(%s),\n' % ', '.join(values))
            output_file.write(insert_statement + ('(%s);\n' % ', '.join(values)))

    # output_file.write(';\n')

# os.remove('registry.csv')
