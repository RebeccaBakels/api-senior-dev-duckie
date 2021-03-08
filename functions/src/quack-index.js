const admin = require("firebase-admin");
const serviceAccount = require("../credentials.json");

let db;

function dbAuth() {
  if (!db) {
    admin.initializeApp({
      credentials: admin.credential.cert(serviceAccount),
    });
    db = admin.firestore();
  }
}

exports.getQuacks = (req, res) => {
  if(!req.params.userId) {
      res.status(400).send('Invalid request')
  }
    dbAuth()
  db.collection('quacks').where('userId', '==', req.params.userId)
//   db.collection("quacks")
    .get()
    .then((collection) => {
      const quackList = collection.docs.map((doc) => {
        let quack = doc.data();
        quack.id = doc.id;
        return quack;
      });
      res.status(200).send(quackList);
    })
    .catch((err) => res.status(500).send("get quacks failed:", err));
};

exports.postQuack = (req, res) => {
    if(!req.body || !req.body.downloadURL || !req.params.userId) {
        res.status(400).send('Invalid Post')
    }
    dbAuth()
        const newQuack = {
            userId: req.params.userId,
            URL: req.body.downloadURL
        }
        db.collection('quacks').add(newQuack)
        .then(() => {
            this.getQuacks(req, res)
        })
    .catch(err => res.status(500).send('post failed', err))
}
