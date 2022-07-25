import { useEffect, useState } from "react";
import {
  BarterFormData,
  BarterFormErrors,
  BarterFormSectionData
} from "../../../../ts/interfaces/barters";
import { validateSection } from "../utils";
import { useRouter } from "next/router";

interface UseChangeFormSectionProps {
  formSections: BarterFormSectionData[];
  formData: BarterFormData;
}

export const useChangeFormSection = ({
  formSections,
  formData
}: UseChangeFormSectionProps) => {
  const router = useRouter();

  // form field errors
  const [formErrors, setFormErrors] = useState<BarterFormErrors>({});

  // sectionIndex controls which formSection is currently showing
  const [sectionIndex, setSectionIndex] = useState<number>(
    parseInt((router.query.step as string) || "0")
  );

  /**
   * Increment or decrement the sectionIndex state
   * variable based on the direction paramater
   */
  const changeFormSection = (direction: "next" | "prev") => {
    const {sectionIsValid, validationErrors} = validateSection(
      formSections[sectionIndex],
      formData
    );
    if(validationErrors){
        setFormErrors(validationErrors)
    }
    switch (direction) {
      case "next":
        if (sectionIsValid) {
          if (sectionIndex < formSections.length - 1) {
            setSectionIndex((sectionIndex) => sectionIndex + 1);
          }
        }
        break;
      case "prev":
        if (sectionIndex > 0) {
          // clear all form errors
          setFormErrors({});

          setSectionIndex((sectionIndex) => sectionIndex - 1);
        }
        break;
    }
  };

  // when the page loads, set url parameter to step 1
  // when the url parameter updates, update the sectionIndex
  useEffect(() => {
    if (router && router !== null && router !== undefined) {
      if (
        router.query.step &&
        parseInt(router.query.step as string) < formSections.length - 1
      ) {
        setSectionIndex(parseInt(router.query.step as string) - 1);
      }
    }
  }, [router]);

  // when the sectionIndex updates, update the url parameter
  useEffect(() => {
    if (router && router !== null && router !== undefined) {
      if (sectionIndex < formSections.length) {
        router.push(`/barters/create/?step=${sectionIndex + 1}`, undefined, {
          shallow: true
        });
      }
    }
  }, [sectionIndex, formSections]);

  return { sectionIndex, changeFormSection, formErrors, setFormErrors };
};
