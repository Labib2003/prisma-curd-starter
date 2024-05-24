import { z } from "zod";

const createCategory = z.object({
  body: z.strictObject({
    name: z.string(),
  }),
});

const updateCategory = z.object({
  body: z.strictObject({
    name: z.string().optional(),
  }),
});

export const categoryValidator = {
  createCategory,
  updateCategory,
};
