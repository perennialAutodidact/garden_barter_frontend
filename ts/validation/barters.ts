import {z} from 'zod'

export const requiredFieldsSchema = z.object({
    title: z.string().nonempty({ message: "Can't be blank." }).min(3).max(255),
    description: z.string().nonempty({ message: "Can't be blank." }).min(10).max(1000),
    postalCode: z.string().length(5),
    willTradeFor: z.string(),
    isFree: z.boolean(),
    quantity: z.number().min(1),
    quantityUnits: z.string(),
    barterType: z.string().nonempty({ message: "Can't be blank." }),
})

export const barterFormDataSchema = requiredFieldsSchema.extend({
  datePackaged: z.union([z.date(), z.string()]).optional(),
  genus: z.string().optional(),
  species: z.string().optional(),
  commonName: z.string().optional(),
  age: z.string().min(5).optional(),
  dateHarvested: z.union([z.date(), z.string()]).optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  crossStreet1: z.string().optional(),
  crossStreet2: z.string().optional(),
});

export const barterFormDataSchemaPartial = requiredFieldsSchema.partial()
 

export const barterTypeRadioChoiceSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const barterTypeCheckboxOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const barterFormSectionFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean(),
  errors: z.union([z.tuple([]), z.array(z.string())]),
  additionalProps: z.object({
    defaultValue: z.union([z.string(), z.number()]).optional(),
    min: z.number().optional(),
  }),
  label: z.string().optional(),
  columnClasses: z.string().optional(),
  choices: z
    .union([z.array(barterTypeRadioChoiceSchema), z.undefined()])
    .optional(),
  options: z.union([z.any(), z.array(z.any()), z.undefined()]).optional(),
});

export const barterFormSectionDataSchema = z.object({
  sectionName: z.string(),
  sectionNumber: z.string(),
  fields: z.array(barterFormSectionFieldSchema),
});

