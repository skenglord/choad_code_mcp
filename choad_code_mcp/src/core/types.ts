import { Request, Response } from 'express';

export interface RequestHandler {
  (req: Request, res: Response): void;
}
