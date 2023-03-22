import { NextFunction, Request, Response } from 'express';
import ICarService from '../Interfaces/ICarService';
import Car from '../Domains/Car';
import ICarController from '../Interfaces/ICarController';

class CarController implements ICarController {
  private _service: ICarService;

  constructor(service: ICarService) {
    this._service = service;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const carInfo = new Car(req.body).returnInfos();
      const createdCar = await this._service.create(carInfo);
      return res.status(201).json(createdCar);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { id } = req.params; 
      const foundedCar = await this._service.getById(id);
      return res.status(200).json(foundedCar);
    } catch (error) {
      next(error);
    }
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const cars = await this._service.getAll();
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { id } = req.params;
      const { body } = req;
      const carInfoToUpdate = new Car(body).returnInfos();
      const updateCar = await this._service.update(id, carInfoToUpdate);
      return res.status(200).json(updateCar);
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;