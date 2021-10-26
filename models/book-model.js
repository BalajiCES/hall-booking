import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

// Booking Schema
const bookingSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

// Query Middleware
bookingSchema.pre(/^find/, function pop(next) {
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

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
