const express = require('express');
var cors = require("cors");
const helmet = require("helmet");	

require('dotenv').config();

const app = express();
const port = 4000;

const login = require('./routes/Login');
const signup = require('./routes/Register');
const feedBack = require('./routes/News-ChatGPT');
const payment = require('./routes/Payment');
const isApproved = require('./routes/isAuthticated');
const connectDB = require("./db/connect");

// Parse JSON request bodies
app.use(express.json());
app.use(cors());

//Authentication End points
app.use('/login', login);
app.use('/login', login);
app.use('/signup', signup);
app.use('/feedback', feedBack);
app.use('/create-checkout-session', payment);
app.use('/approved', isApproved);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
