import { z } from "zod";

export const requiredFieldsSchema = z.object({
  title: z.string().nonempty({ message: "Can't be blank." }).min(3).max(255),
  description: z
    .string()
    .nonempty({ message: "Can't be blank." })
    .min(10)
    .max(1000),
  postalCode: z.string().length(5).regex(new RegExp('\\d'), 'Must contain only numbers.') ,
  willTradeFor: z.string(),
  isFree: z.boolean(),
  barterType: z.string().nonempty({ message: "Please choose one." })
});

export const barterFormDataSchema = requiredFieldsSchema.extend({
  datePackaged: z.union([z.date(), z.string()]).optional(),
  quantity: z.number().min(1).optional(),
  quantityUnits: z.string().optional(),
  genus: z.string().optional(),
  species: z.string().optional(),
  commonName: z.string().optional(),
  age: z.string().min(5).optional(),
  dateHarvested: z.union([z.date(), z.string()]).optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  crossStreet1: z.string().optional(),
  crossStreet2: z.string().optional()
});

// for validating each section of the form, use this partial schema
export const barterFormDataSchemaPartial = requiredFieldsSchema.partial();

