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
    address: {
      type: String
    },
    capacity: {
      type: Number,
      required: [true, 'Please Provide Your Capacity!']
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Please Provide Your Mobile number!']
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
    onwedBy: {
      // email
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please Provide the Owner Details']
    }
  },
  { timestamps: true }
);

// Query Middleware
hallSchema.pre(/^find/, function pop(next) {
  this.populate({
    path: 'onwedBy',
    select: '-__v'
  });

  next();
});

// create a model out of schema
const Hall = mongoose.model('Hall', hallSchema);

export default Hall;
