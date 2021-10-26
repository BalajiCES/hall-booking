import mongoose from 'mongoose';

const { Schema } = mongoose;

// User Schema
const hallSchema = new Schema(
  {
    hallName: {
      type: String,
      required: [true, 'Please tell us Your Hall name!'],
      unique: true
    },
    price: {
      type: Number
    },
    capacity: {
      type: Number,
      required: [true, 'Please Provide Your Capacity!']
    },
    type: {
      type: [String],
      required: [true, 'Please Provide Your Hall Type!']
    },
    status: {
      type: String,
      enum: ['Available', 'Selected', 'Booked'],
      default: 'Available'
    },
    ownedBy: {
      // email
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please Provide the Owner Details']
    },
    event: {
      type: String,
      enum: ['Marriage', 'Birthday', 'Custom'],
      required: [true, 'Please Provide the Event Details']
    },
    custom: {
      type: String,
      default: 'No custom Type'
    },
    bookings: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking'
      }
    ]
  },
  { timestamps: true }
);

hallSchema.index({ hallName: 'text' });

// Query Middleware
hallSchema.pre(/^find/, function pop(next) {
  this.populate({
    path: 'ownedBy',
    select: '-__v'
  });
  next();
});

// create a model out of schema
const Hall = mongoose.model('Hall', hallSchema);

export default Hall;
