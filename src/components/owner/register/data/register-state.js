const registerState = {
  registerData: {
    loading: false,
    data: {
      hallName: '',
      price: '',
      capacity: '',
      phoneNumber: '',
      event: '',
      type: '',
      custom: '',
      onwedBy: ''
    },
    error: false
  },
  listHalls: {
    loading: false,
    data: {},
    error: false
  }
};

export default registerState;
