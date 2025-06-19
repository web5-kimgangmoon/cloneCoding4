import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

throw new BadRequestException('Something bad happened', {
  cause: new Error(),
  description: 'Some error description',
});
