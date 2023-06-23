import { z } from "zod";

export const UserTasksFormInput = z.object({
  tasksId: z.number(),
  endAt: z.string().transform(arg => new Date(arg)),
});

export type UserTasksFormInput = z.infer<typeof UserTasksFormInput>;
