import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import NotFound from '../Errors/NotFound';
import InvalidRequest from '../Errors/InvalidRequest';
import ICar from '../Interfaces/ICar';
import ICarService from '../Interfaces/ICarService';
import CarModel from '../Models/CarModel';

class CarService implements ICarService {
  private _model: CarModel;

  constructor(model: CarModel) {
    this._model = model;
  }

  async create(CarInfo: ICar): Promise<ICar> {
    const result = await this._model.create(CarInfo);
    
    const createdCar = new Car(result).returnInfos();
    return createdCar;
  }

  async getById(id: string): Promise<ICar> {
    if (!isValidObjectId(id)) throw new InvalidRequest('Invalid mongo id');
    const result = await this._model.getById(id);
    if (!result) throw new NotFound('Car not found');
    const foundedCar = new Car(result).returnInfos();
    return foundedCar;
  }

  async getAll(): Promise<ICar[]> {
    const result = await this._model.getAll();
    const cars = result.map((car) => new Car(car).returnInfos());
    return cars;
  }
}

export default CarService;