import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

// Booking Schema
const bookSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  hallId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hall'
  },
  bookedDate: {
    type: Date,
    required: [true, 'Please Provide Your Booked Date!'],
    validate: [validator.isDate, 'Please Provide a valid Date']
  },
  bookingStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
});

// Document middleware
bookSchema.pre('save', async function statusModified(next) {
  console.log(this);
  console.log(this.hallId.status);
  return next();
});

// Query Middleware
bookSchema.pre(/^find/, function pop(next) {
  this.populate({
    path: 'userId',
    select: '-__v'
  });

  this.populate({
    path: 'hallId',
    select: '-__V'
  });
  next();
});

const Book = mongoose.model('Book', bookSchema);

// const firstBooking = new Book({
//   user: '616531585db2b91f8c6c3ec4',
//   hall: '6165819aecc741bbb850ddc1',
//   bookedDate: Date.now()
// });

// firstBooking
//   .save()
//   .then((doc) => {
//     console.log('Book Hall', doc);
//   })
//   .catch((err) => {
//     console.log('Error', err);
//   });

export default Book;
