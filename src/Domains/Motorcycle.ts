import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private _category: string;
  private _engineCapacity: number;

  constructor(
    { 
      model,
      year,
      color,
      buyValue,
      category,
      engineCapacity,
      status,
      id, 
    }: IMotorcycle,
  ) {
    super({ model, buyValue, color, year, id, status });
    this._category = category;
    this._engineCapacity = engineCapacity;
  }

  public returnInfos() {
    return {
      id: this.id,
      model: this.model,
      year: this.year,
      color: this.color,
      status: this.status,
      buyValue: this.buyValue,
      category: this._category,
      engineCapacity: this._engineCapacity,
    };
  }
}
