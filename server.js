import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

// making evironment varibale available
dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
const PORT = process.env.PORT || 5000;

// Connection with MongoDB
Mongoose.connect(DB).then(() => {
  console.log('Connection Started');
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
