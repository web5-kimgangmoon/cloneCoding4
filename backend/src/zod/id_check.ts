import { z } from 'zod';

export const create_id_schema = z.number().int().positive();

export type Create_id = z.infer<typeof create_id_schema>;
