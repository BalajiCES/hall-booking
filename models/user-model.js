import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

// User Schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please tell us Your name!']
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Please Provide Your Email!'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please Provide a valid email']
    },
    gender: {
      type: String,
      required: [true, 'Please Provide Your  of Date of Birth!']
    },
    dob: {
      type: String,
      required: [true, 'Please Provide Your Date of Birth!'],
      validate: [validator.isDate, 'Please Provide a valid Date']
    },
    age: {
      type: Number
    },
    role: {
      type: String,
      enum: ['user', 'owner'],
      required: [true, 'Please Provide Your Role!']
    },
    password: {
      type: String,
      required: [true, 'Please Provide a Password!'],
      minlength: 8
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator(el) {
          return el === this.password;
        },
        message: 'Password are not the same!'
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
