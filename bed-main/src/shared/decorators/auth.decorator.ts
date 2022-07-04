import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { Roles } from '../../shared/types';

export function Auth(...roles: `${Roles}`[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard));
}
