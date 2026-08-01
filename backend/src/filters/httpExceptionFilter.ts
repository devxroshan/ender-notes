import express from 'express';
import { HttpException } from '../config/http-exception.js';

export const handleHttpException = (err: HttpException, req: express.Request, res: express.Response) => {
    res.status(err.statusCode || 500).json({
        ok: false,
        msg: err.message || "Internal Server Error",
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
        details: err.details || {},
    });
}