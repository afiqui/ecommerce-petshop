import { ZodIssue } from "zod";

export const reduceErrors = (errors: ZodIssue[]) => {
  return errors.reduce((acc: any, error) => {
    const key = error.path.join(".");
    acc[key] = error.message;
    return acc;
  }, {});
};
