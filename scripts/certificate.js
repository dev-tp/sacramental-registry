function displayCertificate(data, sacrament) {
  const verbs = {
    'baptism': 'was baptized',
    'communion': 'celebrated the Sacrament of the Holy Eucharist and received First Communion\n',
    'confirmation': 'was sealed with the Gift of the Holy Spirit\n',
    'profession_of_faith': 'was received into Full Communion with the Roman Catholic Church\n',
  };

  const mother = data['mother'];
  const father = data['father'];

  const parents = mother && father ? `${father} and ${mother}` : mother ? mother : father ? father : null;
  const presider = data[`${sacrament}_presider`];

  const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

  const birthCity = data['birth_city'];
  const birthday = getDate(data['birthdate']).toLocaleDateString('en-US', dateOptions);
  const birthInfo = `born in ${birthCity} on ${birthday}`;

  const sacramentDate = getDate(data[`${sacrament}_date`]).toLocaleDateString('en-US', dateOptions);
  const sacramentChurch = data[`${sacrament}_church`];

  let certificateText = `This is to certify that\n${data['first_name']} ${data['last_name']}\n`;

  if (parents) {
    certificateText += `child of\n${parents}\n`;
  }

  certificateText += `${birthInfo}\n`;
  certificateText += ` ${verbs[sacrament]} on ${sacramentDate}`;

  if (sacramentChurch) {
    certificateText += ` at the ${sacramentChurch}`;
  }

  if (sacrament != 'profession_of_faith') {
    certificateText += `\nAccording to the Rite of the Roman Catholic Church`;
  }

  if (presider) {
    certificateText += `\nby ${presider}`;
  }

  function listSponsors(sponsor1, sponsor2 = null) {
    const sponsorA = data[sponsor1];
    let sponsorB = null;
  
    if (sponsor2) {
      sponsorB = data[sponsor2];
    }
  
    const sponsors = sponsorA && sponsorB ? `${sponsorA} and ${sponsorB}` : sponsorB ? sponsorB : sponsorA ? sponsorA : null;
  
    if (sponsors) {
      certificateText += `\nThe sponsor${sponsorA && sponsorB ? 's' : ''} being\n${sponsors}`;
    }
  }

  if (sacrament == 'baptism') {
    listSponsors('baptism_godfather', 'baptism_godmother');
    certificateText += `\nas it appears on the Baptismal Registry of this church`;
  } else if (sacrament == 'confirmation') {
    listSponsors('confirmation_sponsor');
  } else if (sacrament == 'profession_of_faith') {
    listSponsors('profession_of_faith_sponsor_1', 'profession_of_faith_sponsor_2');
    certificateText += '\nas it appears on the Profession of Faith Register of this church';
  }

  let certificateTitle = 'Certificate of ';

  if (sacrament == 'profession_of_faith') {
    certificateTitle += 'Profession of Faith';
  } else {
    certificateTitle += sacrament.replace(/^\w/, letter => letter.toUpperCase());
  }

  document.getElementById('certificate__title').innerText = certificateTitle;
  document.getElementById('certificate__text').innerText = certificateText;
  document.getElementById('certificate__date').innerText = `Dated ${sacramentDate}`;
  document.getElementById('certificate__id').innerText = formData['id'];

  if (hasMultipleCertificates) {
    hideListedCertificates();
  }

  switchSection('certificate');
}

function getDate(date) {
  date = new Date(date);
  date.setUTCHours(12);
  return date;
}

function loadCertificateData(data, sacrament) {
  if (!data) { // Data will be null except when formData is used in search-form
    const inputs = document.querySelectorAll(`#form__profile .form-control, input[name^="${sacrament}"]`);

    data = {};

    for (const input of inputs) {
      if (input.value) {
        data[input.name] = input.value;
      }
    }

    return displayCertificate(data, sacrament);
  }

  displayCertificate(data, sacrament);
}

document.getElementById('certificate__go-back-button').onclick = function () {
  if (hasMultipleCertificates) {
    showListedCertificates();
  }

  switchSection('form');
};
