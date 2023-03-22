export default interface ICar {
  model: string,
  year: number,
  color: string,
  buyValue: number,
  doorsQty: number,
  seatsQty: number,
  status?: boolean,
  id?: string,
}