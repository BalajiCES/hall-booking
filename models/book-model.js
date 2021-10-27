import mongoose from 'mongoose';
import validator from 'validator';
import constant from '../constant/constant';
import errors from '../constant/erros';

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
      required: [true, errors.bookedDate],
      validate: [validator.isDate, errors.validateDate]
    },
    bookingStatus: {
      type: String,
      enum: [constant.PENDING, constant.APPROVED, constant.REJECTED],
      default: constant.PENDING
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
