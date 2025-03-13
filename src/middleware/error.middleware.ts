import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            next();
        } catch (error) {
            const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
            const message = error instanceof HttpException ? error.message : 'Internal Server Error';
            res.status(status).json({ statusCode: status, message });
        }
    }
}
