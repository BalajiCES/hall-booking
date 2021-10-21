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

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
