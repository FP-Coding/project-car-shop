import IMotorcycle from './IMotorcycle';

export default interface IMotorcycleService {
  create(motorcycleInfo: IMotorcycle): Promise<IMotorcycle>,
  getById(id: string): Promise<IMotorcycle>,
  getAll(): Promise<IMotorcycle[]>,
  update(id: string, obj: IMotorcycle): Promise<IMotorcycle>,
  delete(id: string): Promise<void>,
}