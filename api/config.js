const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

const serviceAccount = require('./todo.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();
module.exports = { db }