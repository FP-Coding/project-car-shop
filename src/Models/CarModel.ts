import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import GenericModel from './GenericModel';

class CarModel extends GenericModel<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
      status: { type: Boolean, required: false },
    }, { versionKey: false }); 
    super(schema, 'Car');
  }
}

export default CarModel;