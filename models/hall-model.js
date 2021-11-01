import mongoose from 'mongoose';
import constant from '../constant/constant';
import errors from '../constant/erros';

const { Schema } = mongoose;

// User Schema
const hallSchema = new Schema(
  {
    hallName: {
      type: String,
      required: [true, errors.hallName],
      unique: true
    },
    price: {
      type: Number
    },
    capacity: {
      type: Number,
      required: [true, errors.capacity]
    },
    type: {
      type: String,
      required: [true, errors.hallType]
    },
    status: {
      type: String,
      enum: ['Available', 'Selected', 'Booked'],
      default: 'Available'
    },
    ownedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, errors.ownerDetails]
    },
    event: {
      type: String,
      enum: [constant.MARRIAGE, constant.BIRTHDAY, constant.CUSTOM],
      required: [true, errors.event]
    },
    custom: {
      type: String,
      default: errors.custom
    }
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
