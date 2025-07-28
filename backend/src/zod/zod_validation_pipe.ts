import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class zod_validation_pipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsed_value = this.schema.parse(value);
      return parsed_value;
    } catch (error) {
      throw new BadRequestException('비정상적인 값 입력');
    }
  }
}
