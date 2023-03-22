import Car from '../Domains/Car';
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
}

export default CarService;