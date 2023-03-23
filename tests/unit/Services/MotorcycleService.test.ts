import Sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import { 
  motorcyclesArray,
  mockIdInvalido,
  mockIdValido, 
  updatedMotorcycle, 
  validMotorcycle } from '../../mocks/motorcycle.mock';
import InvalidRequest from '../../../src/Errors/InvalidRequest';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleModel from '../../../src/Models/MotorcycleODM';
import IError from '../../../src/Interfaces/IError';
import NotFound from '../../../src/Errors/NotFound';
import Motorcycle from '../../../src/Domains/Motorcycle';

const ERROR_MESSAGE_ID = 'Invalid mongo id';

describe('Testando a camada service de Motorcycle', function () {
  const baseModel = new MotorcycleModel();
  const baseService = new MotorcycleService(baseModel);

  it('Se é possível criar uma moto com sucesso', async function () {
    // arrange
    const motorcyleFromDB = { _id: mockIdValido, ...validMotorcycle };
    const motorcyleFormated = new Motorcycle(motorcyleFromDB).returnInfos();
    Sinon.stub(Model, 'create').resolves(motorcyleFromDB);
    // 
    const result = await baseService.create(validMotorcycle);
    // assertion
    expect(result).to.be.deep.equal(motorcyleFormated);
  });

  it('Se é possível buscar uma moto por id com sucesso', async function () {
    // arrange
    const motorcyleFromDB = { _id: mockIdValido, ...validMotorcycle };
    const motorcyleFormated = new Motorcycle(motorcyleFromDB).returnInfos();
    Sinon.stub(Model, 'findById').resolves(motorcyleFromDB);
    // act
    const result = await baseService.getById(mockIdValido);
    // assertion
    expect(result).to.be.deep.equal(motorcyleFormated);
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

  it('Se é lançada uma exceção quando passado um id de um moto inexistente', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    try {
      await baseService.getById(mockIdValido);
    } catch (error) {
      expect(error).to.be.instanceOf(NotFound);
      expect((error as IError).message).to.be.equal('Motorcycle not found');
    }
  });

  it('Se é possível listar todos as motos com sucesso', async function () {
    // arrange
    Sinon.stub(Model, 'find').resolves(motorcyclesArray);
    const formatedMotorcycles = motorcyclesArray
      .map((motorcycle) => new Motorcycle(motorcycle).returnInfos());
    // act
    const result = await baseService.getAll();
    // assertion
    expect(result).to.be.deep.equal(formatedMotorcycles);
  });

  it('Se é possível atualizar uma moto pelo id com sucesso', async function () {
    // arrange
    const motorcyleUpdated = { _id: mockIdValido, ...updatedMotorcycle };
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcyleUpdated);
    const updated = new Motorcycle(motorcyleUpdated).returnInfos();
    // act
    const result = await baseService.update(mockIdValido, updatedMotorcycle);
    // assertion
    expect(result).to.be.deep.equal(updated);
  });

  it(`Se é lançada uma exceção ao tentar atualizar
  uma moto passando um id que não existe`, async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    try {
      await baseService.update(mockIdValido, updatedMotorcycle);
    } catch (err) {
      expect(err).to.be.instanceOf(NotFound);
      expect((err as IError).message).to.be.equal('Motorcycle not found');
    }
  });

  it(`Se é lançada uma exceção ao tentar atualizar
  uma moto passando um id inválido`, async function () {
    try {
      await baseService.update(mockIdInvalido, updatedMotorcycle);
    } catch (e) {
      expect(e).to.be.instanceOf(InvalidRequest);
      expect((e as IError).message).to.be.equal(ERROR_MESSAGE_ID);
    }
  });

  it('Se é possível deletar uma moto pelo id com sucesso', async function () {
    // arrange
    const motorcyle = { _id: mockIdValido, ...validMotorcycle };
    Sinon.stub(Model, 'findByIdAndDelete').resolves(motorcyle);
    // act
    const result = await baseService.delete(mockIdValido);
    // assertion
    expect(result).to.be.deep.equal(undefined);
  });

  it('Se é lançada uma exceção ao tentar deletar uma moto que não existe', async function () {
    try {
      await baseService.delete(mockIdInvalido);
    } catch (err) {
      expect(err).to.be.instanceOf(InvalidRequest);
      expect((err as IError).message).to.be.equal(ERROR_MESSAGE_ID);
    }
  });

  afterEach(function () { return Sinon.restore(); });
});