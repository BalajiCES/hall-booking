const globalErrorHanlder = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  res.status(error.statusCode || 500).json({
    status: false,
    message: error.message || 'Server Error'
  });
};

export default globalErrorHanlder;
