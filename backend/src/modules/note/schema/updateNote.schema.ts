import { z } from 'zod';

export const updateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
}).refine((data) => data.title !== undefined || data.content !== undefined, {
  message: 'At least one field (title or content) must be provided',
});
