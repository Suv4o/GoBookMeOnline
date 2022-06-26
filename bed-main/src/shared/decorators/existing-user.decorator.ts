import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExistingUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.existingUser;
  },
);
