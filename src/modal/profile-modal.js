import * as yup from 'yup';

class PersonModel {
  constructor(
    firstName,
    lastName,
    email,
    gender,
    dob,
    age,
    role,
    password,
    passwordConfirm
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.dob = dob;
    this.age = age;
    this.role = role;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
  }

  getPersonSchema() {
    this.firstName = yup.string().required('First Name is Required');
    this.lastName = yup.string();
    this.email = yup
      .string()
      .email('Email is Not Valid')
      .required('Email is Required');
    this.gender = yup.string().required('Please Choose your Gender');
    this.dob = yup.string().required('Please Choose your DOB');
    this.age = yup.number();
    this.role = yup.string().required('Please Choose Your Role');
    this.password = yup.string().required('Password is Required');
    this.passwordConfirm = yup
      .string()
      .required('Confirm Password is Required');
  }
}
