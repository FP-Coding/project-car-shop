import { NextFunction, Request, Response } from 'express';
import IMotorcyleService from '../Interfaces/IMotorcyleService';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycleController from '../Interfaces/IMotorcycleController';

class MotorcycleController implements IMotorcycleController {
  private _service: IMotorcyleService;

  constructor(service: IMotorcyleService) {
    this._service = service;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const carInfo = new Motorcycle(req.body).returnInfos();
      const createdCar = await this._service.create(carInfo);
      return res.status(201).json(createdCar);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { id } = req.params; 
      const foundedMotorcycles = await this._service.getById(id);
      return res.status(200).json(foundedMotorcycles);
    } catch (error) {
      next(error);
    }
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const motorcycles = await this._service.getAll();
      return res.status(200).json(motorcycles);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { id } = req.params;
      const { body } = req;
      const carInfoToUpdate = new Motorcycle(body).returnInfos();
      const updateMotorcycle = await this._service.update(id, carInfoToUpdate);
      return res.status(200).json(updateMotorcycle);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void | undefined> {
    try {
      const { id } = req.params;
      await this._service.delete(id);
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcycleController;