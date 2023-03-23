import Sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import { 
  carsArray,
  mockIdInvalido,
  mockIdValido, 
  updatedCar, 
  validCar } from '../../mocks/cars.mock';
import InvalidRequest from '../../../src/Errors/InvalidRequest';
import CarService from '../../../src/Services/CarService';
import CarModel from '../../../src/Models/CarODM';
import Car from '../../../src/Domains/Car';
import IError from '../../../src/Interfaces/IError';
import NotFound from '../../../src/Errors/NotFound';

const ERROR_MESSAGE_ID = 'Invalid mongo id';

describe('Testando a camada service de Car', function () {
  const baseModel = new CarModel();
  const baseService = new CarService(baseModel);

  it('Se é possível criar um carro com sucesso', async function () {
    // arrange
    const carFromDB = { _id: mockIdValido, ...validCar };
    const carFormated = new Car(carFromDB).returnInfos();
    Sinon.stub(Model, 'create').resolves(carFromDB);
    // act
    const result = await baseService.create(validCar);
    // assertion
    expect(result).to.be.deep.equal(carFormated);
  });

  it('Se é possível buscar um carro por id com sucesso', async function () {
    // arrange
    const carFromDB = { _id: mockIdValido, ...validCar };
    const carFormated = new Car(carFromDB).returnInfos();
    Sinon.stub(Model, 'findById').resolves(carFromDB);
    // act
    const result = await baseService.getById(mockIdValido);
    // assertion
    expect(result).to.be.deep.equal(carFormated);
  });

  it('Se é lançada uma exceção quando passado um id inválido', async function () {
    // act
    // assertion
    try {
      await baseService.getById(mockIdInvalido);
    } catch (error) {
      expect(error).to.be.instanceOf(InvalidRequest);
      expect((error as IError).message).to.be.equal(ERROR_MESSAGE_ID);
    }
  });

  it('Se é lançada uma exceção quando passado um id de um carro inexistente', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    try {
      await baseService.getById(mockIdValido);
    } catch (error) {
      expect(error).to.be.instanceOf(NotFound);
      expect((error as IError).message).to.be.equal('Car not found');
    }
  });

  it('Se é possível listar todos os carros com sucesso', async function () {
    // arrange
    Sinon.stub(Model, 'find').resolves(carsArray);
    const formatedCars = carsArray.map((car) => new Car(car).returnInfos());
    // act
    const result = await baseService.getAll();
    // assertion
    expect(result).to.be.deep.equal(formatedCars);
  });

  it('Se é possível atualizar um carro pelo id com sucesso', async function () {
    // arrange
    const carUpdated = { _id: mockIdValido, ...updatedCar };
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(carUpdated);
    const updated = new Car(carUpdated).returnInfos();
    // act
    const result = await baseService.update(mockIdValido, updatedCar);
    // assertion
    expect(result).to.be.deep.equal(updated);
  });

  it(`Se é lançada uma exceção ao tentar atualizar
  um carro passando um id que não existe`, async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    try {
      await baseService.update(mockIdValido, updatedCar);
    } catch (err) {
      expect(err).to.be.instanceOf(NotFound);
      expect((err as IError).message).to.be.equal('Car not found');
    }
  });

  it(`Se é lançada uma exceção ao tentar atualizar
  um carro passando um id inválido`, async function () {
    try {
      await baseService.update(mockIdInvalido, updatedCar);
    } catch (e) {
      expect(e).to.be.instanceOf(InvalidRequest);
      expect((e as IError).message).to.be.equal(ERROR_MESSAGE_ID);
    }
  });

  it('Se é possível deletar um carro pelo id com sucesso', async function () {
    // arrange
    const car = { _id: mockIdValido, ...validCar };
    Sinon.stub(Model, 'findByIdAndDelete').resolves(car);
    // act
    const result = await baseService.delete(mockIdValido);
    // assertion
    expect(result).to.be.deep.equal(undefined);
  });

  it('Se é lançada uma exceção ao tentar deletar um carro que não existe', async function () {
    try {
      await baseService.delete(mockIdInvalido);
    } catch (err) {
      expect(err).to.be.instanceOf(InvalidRequest);
      expect((err as IError).message).to.be.equal(ERROR_MESSAGE_ID);
    }
  });

  afterEach(function () { return Sinon.restore(); });
});