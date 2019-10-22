const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const User = require('./Models/user');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database from "MongoDB Atlas"
const dbRoute =
  'mongodb+srv://djwisema:viyrCAxnv9bxuFx1@clusterofwisdom-10ezm.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this method fetches all available users in our database
router.get('/getUser', (req, res) => {
  const { name, password } = req.query;

  User.find({name: name, password: password}, (err, data) => {
    if (err || !data) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this method updates a specific user's data in our database
router.post('/updateUser', (req, res) => {
  const { id, update } = req.body;
  User.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this method removes an existing user in our database
router.delete('/deleteUser', (req, res) => {
  const { id } = req.body;
  User.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this method adds a new user in our database
router.post('/createUser', (req, res) => {
  let user = new User();

  const { name, password } = req.body;

  if (!name || !password) 
  {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  user.id = id;
  user.name = name;
  user.password = password;

  user.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /user for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));