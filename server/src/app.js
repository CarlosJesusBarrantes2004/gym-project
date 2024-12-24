import express, { json } from 'express';
import cors from 'cors';
import router from './routes/index.js';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

//Middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(json());
app.use(morgan('dev'));
//Routes
app.use(router);

//Not Found
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

//Error Handler
app.use(errorMiddleware);

export default app;
