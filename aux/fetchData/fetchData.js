/* eslint-disable no-console */
const fs = require('fs').promises;
const { resolve } = require('path');
const GSheeter = require('@imaginary-maths/gsheeter');
const config = require('./config.json');
const credentials = require('./client_secret.json');

const destinationPath = '../../data.json';


GSheeter.get(config.spreadsheetID, config.worksheetID, { credentials })
  .then((items) => {
    const applications = new Map();
    items
      .filter(item => !(config.ignoredApplications.includes(item.id)))
      .forEach((item) => {
        if (!applications.has(item.id)) {
          applications.set(item.id, {
            id: item.id,
          });
        }
        const application = applications.get(item.id);
        if (application[item.field] === undefined) {
          application[item.field] = {};
        }
        config.languages.forEach((lang) => {
          if (item[lang] !== undefined && item[lang].trim().length > 0) {
            application[item.field][lang] = item[lang].trim();
          }
        });
      });

    return applications;
  })
  .then((applications) => {
    return JSON.stringify({
      applications: [...applications.values()],
    }, null, 2);
  }).then(jsonData => fs.writeFile(destinationPath, jsonData))
  .then(() => {
    console.log(`Data written to ${resolve(destinationPath)}`);
  });
