import ICar from './ICar';

export default interface ICarService {
  create(CarInfo: ICar): Promise<ICar>
}