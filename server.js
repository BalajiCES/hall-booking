import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({
  path: './config.env'
});

// console.log(process.env);
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
const PORT = process.env.PORT || 5000;

Mongoose.connect(DB).then(() => {
  console.log('Connection Started');
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
