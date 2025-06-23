import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorators';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './authentication.guard';

type Role = {
  name: string;
};

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', Roles),
    UseGuards(AuthGuard, RolesGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
