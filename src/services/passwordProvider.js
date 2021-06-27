import CryptoJS from 'crypto-js';

const SESSION_STORAGE_PREFIX = 'kaimfa_';

const PASSWORD_SALT_KEY = `${SESSION_STORAGE_PREFIX}password-salt`;
const PASSWORD_HASH_KEY = `${SESSION_STORAGE_PREFIX}password-hash`;

const SESSION_PASSWORD_KEY = `${SESSION_STORAGE_PREFIX}password`;

export {
  hasSetPassword,
  savePassword,
  isValidPassword,
  isAuthenticated,
  getSessionPassword,
  setSessionPassword,
};

function hasSetPassword() {
  return !!localStorage.getItem(PASSWORD_SALT_KEY);
}

function savePassword(password) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const hash = CryptoJS.SHA512(`${password}${salt}`);

  localStorage.setItem(PASSWORD_SALT_KEY, salt);
  localStorage.setItem(PASSWORD_HASH_KEY, hash);

  setSessionPassword(password);
}

function isValidPassword(passwordToCheck) {
  const salt = localStorage.getItem(PASSWORD_SALT_KEY);
  const hash = CryptoJS.SHA512(`${passwordToCheck}${salt}`).toString();

  const expectedHash = localStorage.getItem(PASSWORD_HASH_KEY);

  return hash === expectedHash;
}

function isAuthenticated() {
  return !!getSessionPassword();
}

function getSessionPassword() {
  return sessionStorage.getItem(SESSION_PASSWORD_KEY);
}

function setSessionPassword(password) {
  return sessionStorage.setItem(SESSION_PASSWORD_KEY, password);
}
