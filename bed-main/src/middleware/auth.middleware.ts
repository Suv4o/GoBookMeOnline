import {
  ForbiddenException,
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ExpressRequest, FirebaseUserRecord } from '../shared/types';
import { FirebaseAdmin } from '../config/firebase.config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger('AuthMiddleware');
  constructor(private readonly firebase: FirebaseAdmin) {}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    const firebase = this.firebase.setup();
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new ForbiddenException('No access token provided!');
    }

    try {
      const accessToken = bearerToken.split(' ')[1];
      const decodedToken = await firebase.auth().verifyIdToken(accessToken);
      const uid = decodedToken.uid;
      const user = (await firebase.auth().getUser(uid)) as FirebaseUserRecord;

      req.user = user;
      next();
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid access token!');
    }
  }
}
