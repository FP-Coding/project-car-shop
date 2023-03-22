import ICar from './ICar';

export default interface ICarService {
  create(CarInfo: ICar): Promise<ICar>,
  getById(id: string): Promise<ICar>,
  getAll(): Promise<ICar[]>,
  update(id: string, obj: ICar): Promise<ICar>,
}