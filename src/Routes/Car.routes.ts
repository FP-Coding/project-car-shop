import { Router, Request, Response, NextFunction } from 'express';
import CarController from '../Controllers/CarController';
import CarModel from '../Models/CarModel';
import CarService from '../Services/CarService';

const baseModel = new CarModel();
const baseService = new CarService(baseModel);
const baseController = new CarController(baseService);

const route = Router();

route.use(
  '/', 
  (req: Request, res: Response, next: NextFunction) => baseController.create(req, res, next),
);

export default route;