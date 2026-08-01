import z from "zod";
import express from "express";

interface Schema {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
}

export const validateSchema = (schema: Schema) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.params) {
        const validatedParams = await schema.params.parseAsync(req.params) as any
        Object.assign(req.params, validatedParams);
      }
      if (schema.query) {
        const validatedQuery = await schema.query.parseAsync(req.query) as any;
        Object.assign(req.query, validatedQuery);
      }
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.issues.map((issue) => [issue.path.join("."), issue.message]) });
      }
      next(err);
    }
  };
};