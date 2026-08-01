import express from "express";

export interface IResponse {
  ok?: boolean;
  msg: string;
  data?: any;
  statusCode?: number;
}

export const asyncRequestHandler = (
  fn: (
    req: express.Request,
    res: express.Response,
  ) => Promise<void | IResponse>,
) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    fn(req, res)
      .then((response) => {
        if (res.headersSent) return;
        else if (response) {
          res.status(response.statusCode || 200).json({
            ok: response.ok,
            msg: response.msg,
            data: response.data,
          });
        } else {
          res.status(200).json({
            ok: true,
            msg: "Default controller response.",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  };
};
