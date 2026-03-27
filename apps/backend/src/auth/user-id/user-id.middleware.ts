import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = req.headers['x-user-id'];
    if (!id || Array.isArray(id)) {
      throw new UnauthorizedException('x-user-id header is required');
    }
    (req as any).user = { id };
    next();
  }
}
