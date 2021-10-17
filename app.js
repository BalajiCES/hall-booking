import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user-routes';
import hallRoutes from './routes/hall-routes';
import AppError from './utils/appError';
import globalErrorHanlder from './controller/error-controller';
import bookRoutes from './routes/book-routes';

const app = express();

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

// all other undefined paths
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLobal Error Handler
app.use(globalErrorHanlder);

export default app;
