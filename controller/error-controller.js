const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const globalErrorHanlder = (err, req, res) => {
  const error = { ...err };
  error.statusCode = err.statusCode || 500;
  error.status = err.status || 'error';
  sendError(error, res);
};

export default globalErrorHanlder;
