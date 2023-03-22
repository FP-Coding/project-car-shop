import { NextFunction, Request, Response } from 'express';

export default interface ICarController {
  create(req: Request, res: Response, next: NextFunction): Promise<Response | void>
} 