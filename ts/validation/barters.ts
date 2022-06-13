import {z} from 'zod'

export const barterFormDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  postalCode: z.string(),
  willTradeFor: z.string(),
  isFree: z.boolean(),
  quantity: z.number(),
  quantityUnits: z.string(),
  barterType: z.string(),
  datePackaged: z.union([z.date(), z.string()]).optional(),
  genus: z.string().optional(),
  species: z.string().optional(),
  commonName: z.string().optional(),
  age: z.string().optional(),
  dateHarvested: z.union([z.date(), z.string()]).optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  crossStreet1: z.string().optional(),
  crossStreet2: z.string().optional(),
});


export const iHaveSectionSchema= z.object({})


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

