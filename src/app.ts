import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoute from './Routes/Car.routes';
import motorcycleRoute from './Routes/Motorcycle.routes';

const app = express();

app.use(express.json());

app.use('/cars', carRoute);
app.use('/motorcycles', motorcycleRoute);

app.use(ErrorHandler.handle);

export default app;
