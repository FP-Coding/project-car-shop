import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import GenericModel from './AbstractODM';

class MotorcycleModel extends GenericModel<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      buyValue: { type: Number, required: true },
      engineCapacity: { type: Number, required: true },
      category: { type: String, required: true },
      status: { type: Boolean, required: false },
    }, { versionKey: false }); 
    super(schema, 'Motorcycle');
  }
}

export default MotorcycleModel;