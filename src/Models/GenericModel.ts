import { model, Model, models, Schema } from 'mongoose';

abstract class GenericModel<T> {
  protected model: Model<T>;
  protected schema: Schema<T>;
  protected modelName: string;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create(obj);
  }
}

export default GenericModel;