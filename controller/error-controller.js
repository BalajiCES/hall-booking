const sendError = (err, res) => {
  console.log('I am reached');
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const globalErrorHanlder = (err, req, res) => {
  console.log('err', err);
  const error = { ...err };
  error.statusCode = err.statusCode || 500;
  error.status = err.status || 'error';
  sendError(error, res);
};

export default globalErrorHanlder;
