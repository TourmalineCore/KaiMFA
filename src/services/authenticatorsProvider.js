import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { getSessionPassword } from './passwordProvider';

const DB_NAME = 'TC_KaiMFA_DB';

let db;
let request;

if (process.env.NODE_ENV === 'development') {
  request = indexedDB.open(DB_NAME);
} else {
  request = indexedDB.open(DB_NAME, { storageType: 'persistent' });
}

const dbReadyPromise = new Promise((resolve, reject) => {
  request.onerror = (event) => {
    alert('Application cannot open its database. You might be runing out of storage capacity.');
    reject('Cannot create the db');
  };

  request.onsuccess = (event) => {
    db = event.target.result;

    db.onerror = (event) => {
      console.error('Database error: ' + event.target.errorCode);
    };

    resolve();
  };

  request.onupgradeneeded = (event) => {
    db = event.target.result;

    if (event.oldVersion < 1) {
      // Version 1 is the first version of the database.
      const authObjectStore = db.createObjectStore('authenticators', { keyPath: 'id' });
      authObjectStore.createIndex('name', 'name', { unique: false });
    }

    const transaction = event.target.transaction;

    transaction.oncomplete =
      function (event) {
        // Now store is available to be populated
        resolve();
      }
  };
});

export {
  getAllAuthenticators,
  getAuthenticatorById,
  createAuthenticator,
  deleteAuthenticatorById,
};

async function getAllAuthenticators() {
  await dbReadyPromise;
  const transaction = db.transaction(['authenticators'], "readwrite");
  const objectStore = transaction.objectStore('authenticators');
  var request = objectStore.getAll();

  const resultPromise = new Promise((resolve, reject) => {
    request.onerror = function (event) {
      console.error("Error on get all!");
      reject('getAll failed!!!');
    };
    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });

  return resultPromise;
}

async function getAuthenticatorById(id) {
  await dbReadyPromise;
  const transaction = db.transaction(['authenticators'], "readwrite");
  const objectStore = transaction.objectStore('authenticators');
  var request = objectStore.get(id);

  const resultPromise = new Promise((resolve, reject) => {
    request.onerror = function (event) {
      console.error("Error on get by id!");
      reject('get failed!!!');
    };
    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });

  return resultPromise;
}

function createAuthenticator({
  name,
  secret,
}) {
  const transaction = db.transaction(['authenticators'], "readwrite");

  transaction.oncomplete = function (event) {
    console.log("All done!");
  };

  transaction.onerror = function (event) {
    console.error("Error on insertion!");
  };

  const encryptedSecret = CryptoJS.AES.encrypt(secret, getSessionPassword()).toString();

  var objectStore = transaction.objectStore('authenticators');
  var request = objectStore.add({
    id: uuidv4(),
    name,
    encryptedSecret,
  });
  request.onsuccess = function (event) {
    console.log("Insertion done!");
  };
}

function deleteAuthenticatorById(id) {
  const transaction = db.transaction(['authenticators'], "readwrite");
  const objectStore = transaction.objectStore('authenticators');
  var request = objectStore.delete(id);

  const resultPromise = new Promise((resolve, reject) => {
    request.onerror = function (event) {
      console.error("Error on delete by id!");
      reject('delete failed!!!');
    };
    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });

  return resultPromise;
}