import { Router, Request, Response, NextFunction } from 'express';
import CarController from '../Controllers/CarController';
import CarModel from '../Models/CarODM';
import CarService from '../Services/CarService';

const baseModel = new CarModel();
const baseService = new CarService(baseModel);
const baseController = new CarController(baseService);

const route = Router();

route.get(
  '/:id', 
  (req: Request, res: Response, next: NextFunction) => baseController.getById(req, res, next),
);

route.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => baseController.update(req, res, next),
);

route.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => baseController.delete(req, res, next),
);

route.get(
  '/', 
  (req: Request, res: Response, next: NextFunction) => baseController.getAll(req, res, next),
);

route.post(
  '/', 
  (req: Request, res: Response, next: NextFunction) => baseController.create(req, res, next),
);

export default route;