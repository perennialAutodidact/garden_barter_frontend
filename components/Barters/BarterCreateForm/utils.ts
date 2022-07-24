import {BarterFormSectionData, BarterFormData} from '../../../ts/interfaces/barters'
import {barterFormDataSchemaPartial} from '../../../ts/validation/barters'



/**
 * Return true if required fields for each section are filled out with valid values, otherwise return false
 */
export const validateSection = (
  sectionData: BarterFormSectionData,
  formData: BarterFormData
): {sectionIsValid:boolean, validationErrors:Record<string, string[]>}=> {
  let sectionIsValid = true;

  const sectionFields = sectionData.fields
    .filter((field) => field.required)
    .map((field) => ({ [field.name]: formData[field.name] }));

  let validationErrors = {};
  sectionFields.forEach((field) => {
    const { success, error } = barterFormDataSchemaPartial.safeParse(field);

    // if zod validation produced errors,
    // compile them into validationErrors
    if (!success) {
      sectionIsValid = false;

      // loop through each validation issue
      error.issues.forEach((issue) => {
        // use the field name as the key
        const fieldName = issue.path[0];
        // collate array of error messages for the field
        validationErrors[fieldName] = [
          ...(validationErrors[fieldName] || []),
          issue.message
        ];
      });
    //   setFormErrors(validationErrors);
    }

    // check that a trade is specified or the item is free
    if (sectionData.name === "willTradeFor") {
      if (formData["willTradeFor"] === "" && !formData["isFree"]) {
        sectionIsValid = false;

        validationErrors = {
          ...validationErrors,
          willTradeFor: ["A trade is required if the item is not free."]
        };
      } else if (formData["willTradeFor"] !== "" && formData["isFree"]) {
        sectionIsValid = false;

        validationErrors = {
            ...validationErrors,
          willTradeFor: ["Free items do not require trades."]
        };
      }
    }

    // check that a unit is entered if the quantity is entered
    if (
      sectionData.name === "generalInfo" &&
      formData.quantity &&
      formData.quantityUnits === "NA"
    ) {
      sectionIsValid = false;

      validationErrors = {
        ...validationErrors,
        quantityUnits: ["Please choose a unit."]
      };
    }
  });

  return {sectionIsValid, validationErrors};
};
