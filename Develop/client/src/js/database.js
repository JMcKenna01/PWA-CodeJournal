import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: false });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open a connection to the database
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readwrite');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .put() method to update or add a new entry to the store
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open a connection to the database
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readonly');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .get() method to get an entry by its ID
  const request = store.get(1);

  // Confirm the request and return the data
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
