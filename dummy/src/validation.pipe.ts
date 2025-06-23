// import {
//   ArgumentMetadata,
//   BadRequestException,
//   Injectable,
//   PipeTransform,
//   Type,
// } from '@nestjs/common';
// import { ZodSchema, z } from 'zod';

// @Injectable()
// export class ValidationPipe implements PipeTransform {
//   transform(value: any, metadata: ArgumentMetadata) {
//     return value;
//   }
// }

// // export interface ArgumentMetadata {
// //   type: 'body' | 'query' | 'param' | 'custom';
// //   metatype?: Type<unknown>;
// //   data?: string;
// // }

// export class ZodValidationPipe implements PipeTransform {
//   constructor(private schema: ZodSchema) {}

//   transform(value: unknown, metadata: ArgumentMetadata) {
//     try {
//       const parsedValue = this.schema.parse(value);
//       return parsedValue;
//     } catch (error) {
//       throw new BadRequestException('Validation failed');
//     }
//   }
// }

// export const createCatSchema = z
//   .object({ name: z.string(), age: z.number(), breed: z.string() })
//   .required();

// export type CreateCatDto = z.infer<typeof createCatSchema>;

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
  private toValidate(metatype: Function): boolean {
    const type: Function[] = [String, Boolean, Number, Array, Object];
    return !type.includes(metatype);
  }
}
