import { NextFunction, Request, Response } from 'express';
import ICarService from '../Interfaces/ICarService';
import Car from '../Domains/Car';
import ICarController from '../Interfaces/ICarController';

class CarController implements ICarController {
  private _service: ICarService;

  constructor(service: ICarService) {
    this._service = service;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const carInfo = new Car(req.body).returnInfos();
      const createdCar = await this._service.create(carInfo);
      return res.status(201).json(createdCar);
    } catch (error) {
      return next(error);
    }
  }
}

export default CarController;