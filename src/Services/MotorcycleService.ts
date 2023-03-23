import { isValidObjectId } from 'mongoose';
import NotFound from '../Errors/NotFound';
import InvalidRequest from '../Errors/InvalidRequest';
import motorCycleModel from '../Models/MotorcycleODM';
import IMotorcycleService from '../Interfaces/IMotorcyleService';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';

class MotorcycleService implements IMotorcycleService {
  private _model: motorCycleModel;

  constructor(model: motorCycleModel) {
    this._model = model;
  }

  async create(motorcycleInfo: IMotorcycle): Promise<IMotorcycle> {
    const result = await this._model.create(motorcycleInfo);
    
    const createdMotorcycle = new Motorcycle(result).returnInfos();
    return createdMotorcycle;
  }

  async getById(id: string): Promise<IMotorcycle> {
    if (!isValidObjectId(id)) throw new InvalidRequest('Invalid mongo id');
    const result = await this._model.getById(id);
    if (!result) throw new NotFound('Motorcycle not found');
    const foundedMotorcycle = new Motorcycle(result).returnInfos();
    return foundedMotorcycle;
  }

  async getAll(): Promise<IMotorcycle[]> {
    const result = await this._model.getAll();
    const Motorcycles = result.map((m) => new Motorcycle(m).returnInfos());
    return Motorcycles;
  }

  async update(id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    if (!isValidObjectId(id)) throw new InvalidRequest('Invalid mongo id');
    const result = await this._model.update(id, obj);
    if (!result) throw new NotFound('Motorcycle not found');
    return new Motorcycle(result).returnInfos();
  }

  async delete(id: string): Promise<void> { 
    if (!isValidObjectId(id)) throw new InvalidRequest();
    await this._model.delete(id);
  }
}

export default MotorcycleService;