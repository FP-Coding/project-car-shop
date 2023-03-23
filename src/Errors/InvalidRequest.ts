export default class NotFound extends Error {
  readonly type = 422;
  constructor(m?: string) {
    super(m || 'Invalid mongo id');
  }
}