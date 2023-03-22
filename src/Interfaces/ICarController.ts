import { NextFunction, Request, Response } from 'express';

export default interface ICarController {
  create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>,
  getById(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>,
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>,
  update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>,
} 