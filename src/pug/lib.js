/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const MarkdownIt = require('markdown-it')();
const config = require('./config.json');

const dataDirectory = '../data';

let lang = 'en';
let localizedData = null;
let localizedStrings = null;

function str(id) {
  if (localizedStrings[id] !== undefined) {
    return MarkdownIt.renderInline(localizedStrings[id]);
  }
  return id;
}

function setLang(code) {
  lang = code;

  const dataFilePath = path.join(dataDirectory, `${code}.json`);
  localizedData = JSON.parse(fs.readFileSync(dataFilePath));
  localizedStrings = {};
  Object.entries(localizedData.texts).forEach(([id, data]) => {
    if (id.substr(0, 1) === '@') {
      localizedStrings[id.substr(1)] = data.title;
    }
  });

  config.siteName = `${str('title')} | ${str('idm2020')}`;
  config.siteDescription = str('description');
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

function getApplications() {
  const answer = [];
  Object.entries(localizedData.texts)
    .forEach(([id, item]) => {
      if (id.substr(0, 1) !== '@') {
        answer.push(Object.assign({}, { id }, item));
      }
    });
  // Sort based on config
  const positions = {};
  config.order.forEach((id, i) => {
    positions[id] = i + 1;
  });
  answer.sort((a, b) => {
    const posA = positions[a.id] || 999999;
    const posB = positions[b.id] || 999999;
    if (posA < posB) return -1;
    if (posA > posB) return 1;
    return 0;
  });
  return answer;
}

function langSwitcher() {
  return Object.entries(config.langSwitcher).map(([code, name]) => ({
    code,
    name,
    path: code === config.langSwitcherDefault ? 'index.html' : `index_${code}.html`,
  }));
}

module.exports = {
  str,
  setLang,
  getLang,
  pageTitle,
  config,
  getApplications,
  langSwitcher,
};
