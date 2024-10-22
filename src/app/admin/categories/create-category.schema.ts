import {z} from 'zod';

export const createCategorySchema = z.object({
  image: z.any().refine((file) => file.length ===1,'Image is required'),
  name: z.string().min(2, 'Name is too short').max(255, 'Name is too long'),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;