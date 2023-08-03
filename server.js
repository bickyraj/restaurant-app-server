const helmet = require('helmet');
const cors = require('cors')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const morgan = require('morgan');
const session = require('express-session')
const App = express()

const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 8000

const AuthRoutes = require('./routes/auth');
const RoleRoutes = require('./routes/role');
const CategoryRoutes = require('./routes/category');
const SubCategoryRoutes = require('./routes/sub-category');
const { verifyToken } = require('./tools');

try {
  mongoose.connect(process.env.MONGODB);
  console.log("Connected to the db");
} catch (error) {
  console.error('Can\'t connect to the db');
}

App.use(helmet());
App.use(morgan('common'));
App.use(cors())
App.use(helmet());
App.use(morgan('common'));
App.use(express.json());
App.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 3600000
  }
}));

App.use('/api/auth', AuthRoutes);
App.use('/api/role', verifyToken, RoleRoutes);
App.use('/api/category', verifyToken, CategoryRoutes);
App.use('/api/sub-category', verifyToken, SubCategoryRoutes);
App.get('/', (request, response) => {
  return response.status(200).send('<h1>Welcome to the restaurant app</h1>');
});

App.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});
