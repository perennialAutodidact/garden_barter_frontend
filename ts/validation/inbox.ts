import { z } from "zod";

export const messageSchema = z
  .string()
  .nonempty({ message: "Can't be blank." })
  .max(1000);
