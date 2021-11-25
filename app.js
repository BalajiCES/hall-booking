import express from 'express';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/user-routes';
import hallRoutes from './routes/hall-routes';
import AppError from './utils/appError';
import globalErrorHanlder from './controller/error-controller';
import bookRoutes from './routes/book-routes';

const app = express();

// All middlewares
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/halls', hallRoutes);
app.use('/user', userRoutes);
app.use('/book', bookRoutes);

// Serve static Assests if in Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// GLobal Error Handler
app.use(globalErrorHanlder);

// all other undefined paths
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
