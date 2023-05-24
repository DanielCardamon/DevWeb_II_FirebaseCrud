const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


const serviceAccount = require('./PrivateKeyFirebaseAcountService.json');

const { where } = require('sequelize');

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

var data = {
  Bairro: "Cidade Antônio1",
  CEP: "09988 999",
  Endereço: "Av. Águia de Haia, 2983",
  Estado: "SP",
  Nome: "Joao ???",
  Observação: "teste1",
};
const Agend = db.collection('Agendamentos');
var AgendID = Agend.doc('1');
// Add a new document in collection Agendamentos with ID 
var res = AgendID.set(data);
// Set the 'Estado' field of the Agendamento
res = AgendID.update({ Estado: "RJ" });



// Remove the 'Estado' field from the document
res = AgendID.update({
  Bairro: FieldValue.delete()
});

/*
//LIsts
var collections =  AgendID.listCollections();
collections.forEach(collection => {
  console.log('Found subcollection with id:', collection.id);
});
//LIsts
const observer = Agend.onSnapshot(docSnapshot => {
  console.log(`Received doc snapshot: ${docSnapshot}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});

// Remove the Collection

async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}
async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}*/
