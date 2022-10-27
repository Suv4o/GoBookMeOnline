import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FirebaseUserRecord } from '../types';

type UserRecord = keyof FirebaseUserRecord;

export const CurrentUser = createParamDecorator(
  (data: UserRecord, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);
