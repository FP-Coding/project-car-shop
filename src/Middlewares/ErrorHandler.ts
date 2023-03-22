import { NextFunction, Request, Response } from 'express';
import IError from '../Interfaces/IError';

class ErrorHandler { 
  static handle(err: IError, _req: Request, res: Response, _next: NextFunction) {
    return res.status(err.type || 500).json({ message: err.message });
  }
}

export default ErrorHandler;