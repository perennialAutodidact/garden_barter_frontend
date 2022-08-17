import { useEffect, useState } from "react";
import { BarterFormData, BarterFormSectionData } from "../../../../ts/interfaces/barters";
import { PLANT_FIELDS, ADDITIONAL_FIELDS, FORM_SECTIONS_DATA } from "../constants";

export const useFormSections = (
  formData: BarterFormData,
  setFormData: React.Dispatch<React.SetStateAction<BarterFormData>>,
) => {
 // meta data for rendering form sections
 const [formSections, setFormSections] = useState<BarterFormSectionData[]>(
    FORM_SECTIONS_DATA
  );
  // when the barterType changes,
  // add additional fields from the newly chosen type
  useEffect(() => {
    formData.barterType &&
      ADDITIONAL_FIELDS[formData.barterType].forEach((field) => {
        setFormData((formData) => ({
          ...formData,
          [field.name]: field.value
        }));
      });
    setFormSections((formSections) => {
      return formSections.map((formSection) => {
        return {
          ...formSection,
          fields:
            formSection.name === "additionalInfo"
              ? ADDITIONAL_FIELDS[formData.barterType]
                ? [...ADDITIONAL_FIELDS[formData.barterType]]
                : []
              : formSection.fields
        };
      });
    });
  }, [formData.barterType]);

  return {formSections}
};
