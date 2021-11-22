import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import errors from '../constant/erros';

const { Schema } = mongoose;

// User Schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, errors.firstName]
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: [true, errors.email],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, errors.validateEmail]
    },
    gender: {
      type: String,
      required: [true, errors.gender]
    },
    dob: {
      type: String,
      required: [true, errors.dob],
      validate: [validator.isDate]
    },
    age: {
      type: Number
    },
    role: {
      type: String,
      enum: ['User', 'Owner', 'Admin'],
      required: [true, errors.role]
    },
    password: {
      type: String,
      required: [true, errors.password],
      minlength: 8
    },
    passwordConfirm: {
      type: String,
      required: [true, errors.confirmPassword],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator(el) {
          return el === this.password;
        },
        message: errors.validatePassword
      }
    }
  },
  { timestamps: true }
);

// pre-save document middleware
userSchema.pre('save', async function passModified(next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) {
    return next();
  }
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete the password confirm field
  this.passwordConfirm = undefined;
  return next();
});

// instance methods
userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  const isValid = await bcrypt.compare(candidatePassword, userPassword);
  return isValid;
};

// create a model out of schema
const User = mongoose.model('User', userSchema);

// create an instance of the user modal
// const firstUser = new User({
//   firstName: 'Balaji',
//   email: 'balaji.alageshan@cesled.com',
//   gender: 'Male',
//   dob: '2000/07/05',
//   mobileNumber: 9486257341,
//   role: 'Owner',
//   password: '12345678'
// });

// firstUser
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR ', err);
//   });

export default User;
