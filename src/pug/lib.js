const config = require('./config.json');
const localizedStrings = require('./strings.json');
const data = require('../../data.json');

let lang = 'en';

function str(id) {
  if (localizedStrings[id] !== undefined && localizedStrings[id][lang] !== undefined) {
    return localizedStrings[id][lang];
  }
  return id;
}

function setLang(code) {
  lang = code;
}

function getLang() {
  return lang;
}

function pageTitle(title) {
  if (title === undefined) {
    return config.siteName;
  }
  return `${title} - ${config.siteName}`;
}

function applications(language) {
  return data.applications
    .filter(each => each.title[language] !== undefined && each.id !== 'main')
    .map(each => ({
      id: each.id,
      title: each.title[language],
      body: each.body[language],
      links: each.links[language] || each.links.en,
    }));
}

module.exports = {
  str,
  setLang,
  getLang,
  pageTitle,
  config,
  applications
};
