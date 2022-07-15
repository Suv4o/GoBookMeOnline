import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ExpressRequest, FirebaseUserRecord } from '../shared/types';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetExistingUserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    const currentUser = req.user as FirebaseUserRecord;
    const findObjUser = {} as Partial<{ email: string; phoneNumber: string }>;

    if (req.body?.email) {
      findObjUser.email = req.body.email;
    }

    if (currentUser?.email) {
      findObjUser.email = currentUser.email;
    }

    if (req.body?.phoneNumber) {
      findObjUser.phoneNumber = req.body.phoneNumber;
    }

    if (currentUser?.phoneNumber) {
      findObjUser.phoneNumber = currentUser.phoneNumber;
    }

    req.existingUser = null;

    if (Object.keys(findObjUser).length > 0) {
      const user = await this.userRepository.findOne({
        where: { ...findObjUser },
      });

      if (user) {
        req.existingUser = user;
      }
    }
    next();
  }
}
