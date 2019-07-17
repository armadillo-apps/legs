const mongoose = require('mongoose');
const dbURI =
  global.__MONGO_URI__ ||
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/occupant';
console.log(global.__MONGO_URI__);

mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongodb');
});
