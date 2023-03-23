import ICar from '../../src/Interfaces/ICar';

const nameModelCar = 'Uno da Escada';
export const mockIdValido = '641b9c82f24eed6ed589bfda';
export const mockIdInvalido = 'ID_INVALIDO';

export const validCar: ICar = {
  model: nameModelCar,
  year: 1960,
  color: 'Red',
  buyValue: 1500,
  doorsQty: 2,
  seatsQty: 2,
};

export const validCarWithStatus: ICar = {
  model: nameModelCar,
  year: 1960,
  color: 'Red',
  status: true,
  buyValue: 1500,
  doorsQty: 2,
  seatsQty: 2,
};

export const updatedCar: ICar = {
  model: nameModelCar,
  year: 1979,
  color: 'Red',
  status: true,
  buyValue: 3500,
  doorsQty: 2,
  seatsQty: 4,
};

export const carsArray = [
  {
    _id: '641b9c82f24eed6ed589bfda',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    _id: '641b9c82f24eed6ed589bfge',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    status: true,
    buyValue: 39.000,
    doorsQty: 2,
    seatsQty: 5,
  },
];
