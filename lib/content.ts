import { z } from "zod";
export const topicFrontmatter = z.object({
  title: z.string().min(3), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  specialty: z.string().min(2), summary: z.string().min(10), reviewDueAt: z.string().datetime(),
  references: z.array(z.object({ title: z.string().min(2), url: z.string().url().optional() })).min(1),
});
