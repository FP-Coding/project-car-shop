import { NextFunction, Request, Response } from 'express';

class ErrorHandler { 
  static handle(err: Error, _req: Request, res: Response, _next: NextFunction) {
    return res.status(500).json({ message: err.message });
  }
}

export default ErrorHandler;