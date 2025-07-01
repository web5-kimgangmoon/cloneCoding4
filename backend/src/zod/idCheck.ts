import { z } from 'zod';

export const createIdSchema = z.number().int().positive();

export type CreateId = z.infer<typeof createIdSchema>;
