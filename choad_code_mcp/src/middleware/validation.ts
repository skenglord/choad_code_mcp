import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const querySchema = Joi.object({
  query: Joi.string().min(1).required(),
  context: Joi.object().optional(),
});

export const validateQuery = (req: Request, res: Response, next: NextFunction) => {
  const { error } = querySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
