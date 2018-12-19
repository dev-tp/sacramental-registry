-- UPDATE cathedral0 SET male = FALSE WHERE id = 1;
-- DELETE FROM cathedral0 WHERE id IN (1025, 3663, 5442, 5752, 7548, 7549, 7550, 7551, 7552);

SELECT

cathedral0.id,
cathedral0.firstname AS first_name,
cathedral0.surname AS last_name,
IF(cathedral0.male, 'M', 'F') AS sex,
cathedral0.birthdate,
cathedral0.birthcity AS birth_city,
cathedral0.address1 AS home_address_line_1,
cathedral0.address2 AS home_address_line_2,
cathedral0.city,
cathedral0.state AS region,
cathedral0.zip AS zip_code,
cathedral0.father,
cathedral0.mother,

cathedral0.baptdate AS baptism_date,
cathedral1.baptchurch AS baptism_church,
cathedral1.godfather AS baptism_godfather,
cathedral1.proxyf AS baptism_proxy_godfather,
cathedral1.godmother AS baptism_godmother,
cathedral1.proxym AS baptism_proxy_godmother,
cathedral1.presider AS baptism_presider,
cathedral1.volume AS baptism_volume,
cathedral1.page AS baptism_page,
cathedral1.number AS baptism_number,

cathedral0.commdate AS communion_date,
cathedral2.commchurch AS communion_church,
cathedral2.presider AS communion_presider,
cathedral2.volume AS communion_volume,
cathedral2.page AS communion_page,
cathedral2.number AS communion_number,

cathedral0.confdate AS confirmation_date,
cathedral3.confchurch AS confirmation_church,
cathedral3.presider AS confirmation_presider,
cathedral3.confname AS confirmation_name,
cathedral3.sponsor AS confirmation_sponsor,
cathedral3.volume AS confirmation_volume,
cathedral3.page AS confirmation_page,
cathedral3.number AS confirmation_number,

cathedral0.weddate AS marriage_date,
IF(cathedral0.male, cathedral4.firstnameb, cathedral4.firstnameg) AS marriage_partner_first_name,
IF(cathedral0.male, cathedral4.surnameb, cathedral4.surnameg) AS marriage_partner_last_name,
IF(cathedral0.male, cathedral4.fatherb, cathedral4.fatherg) AS marriage_partner_father,
IF(cathedral0.male, cathedral4.motherb, cathedral4.motherg) AS marriage_partner_mother,
IF(cathedral0.male, cathedral4.address1b, cathedral4.address1g) AS marriage_partner_home_address_line_1,
IF(cathedral0.male, cathedral4.address2b, cathedral4.address2g) AS marriage_partner_home_address_line_2,
IF(cathedral0.male, cathedral4.cityb, cathedral4.cityg) AS marriage_partner_city,
IF(cathedral0.male, cathedral4.baptdateb, cathedral4.baptdateg) AS marriage_partner_baptism_date,
IF(cathedral0.male, cathedral4.baptchrchb, cathedral4.baptchrchg) AS marriage_partner_baptism_church,
cathedral4.wedplace AS marriage_church,
cathedral4.presider AS marriage_presider,
cathedral4.witness1 AS marriage_witness_1,
cathedral4.witness2 AS marriage_witness_2,
cathedral4.volume AS marriage_volume,
cathedral4.page AS marriage_page,
cathedral4.number AS marriage_number,

cathedral0.profdate AS profession_of_faith_date,
cathedral5.profchurch AS profession_of_faith_church,
cathedral5.presider AS profession_of_faith_presider,
cathedral5.godfather AS profession_of_faith_sponsor_1,
cathedral5.godmother AS profession_of_faith_sponsor_2,
cathedral5.volume AS profession_of_faith_volume,
cathedral5.page AS profession_of_faith_page,
cathedral5.number AS profession_of_faith_number,

cathedral7.deathdate AS death_date,
cathedral0.burydate AS death_burial_date,
cathedral7.buryplace AS death_burial,
cathedral7.sac_anoint AS death_anointing,
cathedral7.presider AS death_presider,
cathedral7.volume AS death_volume,
cathedral7.page AS death_page,
cathedral7.number AS death_number,

cathedral0.remarks AS comments

FROM cathedral0
LEFT JOIN cathedral1 ON cathedral0.baptkey = cathedral1.keyfield1
LEFT JOIN cathedral2 ON cathedral0.commkey = cathedral2.keyfield2
LEFT JOIN cathedral3 ON cathedral0.confkey = cathedral3.keyfield3
LEFT JOIN cathedral4 ON cathedral0.weddingkey = cathedral4.keyfield4
LEFT JOIN cathedral5 ON cathedral0.profkey = cathedral5.keyfield5
LEFT JOIN cathedral7 ON cathedral0.deathkey = cathedral7.keyfield7
ORDER BY cathedral0.id;
