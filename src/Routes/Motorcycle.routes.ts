import { Router, Request, Response, NextFunction } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import MotorcycleModel from '../Models/MotorcycleODM';
import MotorcycleService from '../Services/MotorcycleService';

const baseModel = new MotorcycleModel();
const baseService = new MotorcycleService(baseModel);
const baseController = new MotorcycleController(baseService);

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