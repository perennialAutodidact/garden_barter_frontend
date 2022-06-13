import React, { useState, useEffect } from "react";
import { BARTER_TYPES, QUANTITY_UNITS } from "../../../constants";
import { titleize } from "../../../utils/helpers";
import FormSection from "./FormSection";
import _ from "lodash";
import {
  BarterFormData,
  BarterFormSectionData,
} from "../../../ts/interfaces/barters";
import { barterFormDataSchema } from "../../../ts/validation/barters";
import { useRouter } from "next/router";

const BarterCreateForm = () => {
  const router = useRouter();

  const [currentYear, _] = useState(new Date().getFullYear());

  // These fields will be rendered on each page of the form
  const PLANT_FIELDS = [
    {
      name: "genus",
      type: "text",
      label: "Genus",
      errors: [],
      required: false,
      additionalProps: {},
    },
    {
      name: "species",
      type: "text",
      label: "Species",
      errors: [],
      required: false,
      additionalProps: {},
    },
    {
      name: "commonName",
      type: "text",
      label: "Common Name",
      errors: [],
      required: false,
      additionalProps: {},
    },
  ];
  const ADDITIONAL_FIELDS = {
    seed: [
      ...PLANT_FIELDS,
      {
        name: "yearPackaged",
        type: "number",
        label: "Year Packaged",
        required: false,
        errors: [],
        additionalProps: { defaultValue: currentYear, max: currentYear },
      },
    ],
    plant: [...PLANT_FIELDS],
    produce: [...PLANT_FIELDS],
    material: [
      {
        name: "dimensions",
        type: "text",
        label: "Dimensions",
        errors: [],
        required: false,
        additionalProps: { placeholder: "Height x Width x Depth" },
      },
    ],
    tool: [
      {
        name: "dimensions",
        type: "text",
        label: "Dimensions",
        errors: [],
        required: false,
        additionalProps: { placeholder: "Height x Width x Depth" },
      },
    ],
  };

  // fields required for all barters
  const requiredFields = {
    title: "",
    description: "",
    postalCode: "",
    willTradeFor: "",
    isFree: false,
    quantity: 1,
    quantityUnits: "CT",
    barterType: "",
  };

  // state object for the form
  const [formData, setFormData] = useState<BarterFormData>({
    ...requiredFields,
    datePackaged: "",
    genus: "",
    species: "",
    commonName: "",
    dateHarvested: "",
    latitude: "",
    longitude: "",
    crossStreet1: "",
    crossStreet2: "",
  });

  // sectionIndex controls which formSection is currently showing
  const [sectionIndex, setSectionIndex] = useState<number>(
    parseInt(router.query.step as string) || 0
  );

  // meta data for rendering form sections
  const [formSections, setFormSections] = useState([
    {
    name: 'iHave',
      headerText: "I have...",
      number: "1 of 5",
      fields: [
        {
          name: "barterType",
          type: "radio",
          required: true,
          errors: [],
          additionalProps: {},
          choices: BARTER_TYPES.map((barterType) => ({
            label: titleize(barterType),
            value: barterType,
          })),
        },
      ],
    },
    {
        name: 'generalInfo',
      headerText: "general info",
      number: "2 of 5",
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          required: true,
          errors: [],
          additionalProps: {},
        },
        {
          type: "textArea",
          name: "description",
          label: "Description",
          required: true,
          errors: [],
          additionalProps: {},
        },

        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          required: false,
          errors: [],
          additionalProps: { min: 1 },
          columnClasses: "col-6",
        },
        {
          name: "quantityUnits",
          type: "select",
          label: "Unit",
          required: false,
          errors: [],
          additionalProps: {},
          options: QUANTITY_UNITS,
          columnClasses: "col-6",
        },
      ],
    },
    {
    name: 'additionalInfo',
      headerText: "additional info",
      number: "3 of 5",
      fields: [
        //calculate additional fields
      ],
    },
    {
        name: 'willTradeFor',
      headerText: "will trade for",
      number: "4 of 5",
      fields: [
        {
          name: "willTradeFor",
          type: "textArea",
          required: true,
          errors: [],
          additionalProps: {},
          label: "Will Trade For",
        },
        {
          name: "isFree",
          type: "checkbox",
          required: false,
          errors: [],
          additionalProps: {},
          choices: [{ label: "Free (No Trade Required)", value: "" }],
        },
      ],
    },
    {

      name: "location",
      headerText: 'location',
      number: "5 of 5",
      fields: [
        {
          name: "crossStreet1",
          type: "text",
          required: false,
          errors: [],
          additionalProps: {},
          label: "Street",
          columnClasses: "col-6",
        },

        {
          name: "crossStreet2",
          type: "text",
          required: false,
          errors: [],
          additionalProps: {},
          label: "Cross Street",
          columnClasses: "col-6",
        },
        {
          name: "latitude",
          type: "text",
          required: false,
          errors: [],
          additionalProps: {},
          label: "Latitude",
          columnClasses: "col-6",
        },
        {
          name: "longitude",
          type: "text",
          required: false,
          errors: [],
          additionalProps: {},
          label: "Longitude",
          columnClasses: "col-6",
        },
        {
          name: "postalCode",
          type: "text",
          required: true,
          errors: [],
          additionalProps: {},
          label: "Postal Code",
          columnClasses: "col-6",
        },
      ],
    },
  ]);
  /**
   * Return true if required fields for each section are filled out with valid values, otherwise return false
   */
  const validateSection = (sectionData: BarterFormSectionData): boolean => {
    let sectionIsValid = true;
    // check that all required fields have values

    sectionData.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        sectionIsValid = false;
        console.log("invalid!", field.name);
        // update field errors if blank
        field.errors = (field.errors as string[]).concat([field.name]);
      } else {
        field.errors = [];
      }
    });

    return sectionIsValid;
  };

  /**
   * Increment or decrement the sectionIndex state
   * variable based on the direction paramater
   */
  const changeFormSection = (
    e: React.ChangeEvent<HTMLInputElement>,
    direction: "next" | "prev"
  ) => {
    e.preventDefault();
    const sectionIsValid = validateSection(formSections[sectionIndex]);
    if (sectionIsValid) {
      switch (direction) {
        case "next":
          if (sectionIndex < formSections.length) {
            setSectionIndex((sectionIndex) => ++sectionIndex);
          }
          break;
        case "prev":
          if (sectionIndex > 0) {
            setSectionIndex((sectionIndex) => --sectionIndex);
          }
          break;
      }
    }
  };

  // when the page loads, set url parameter to step 1
  useEffect(() => {
    // Always do navigations after the first render
    if (!router.query.step) {
      router.push(`create/?step=${sectionIndex + 1}`, undefined, {
        shallow: true,
      });
    }
  }, []);

  // when the url parameter updates, update the sectionIndex
  useEffect(() => {
    if (router.query.step) {
      setSectionIndex(
        (sectionIndex) => parseInt(router.query.step as string) - 1
      );
    }
  }, [router.query.step]);

  // when the sectionIndex updates, update the url parameter
  useEffect(() => {
    router.push(`create/?step=${sectionIndex + 1}`, undefined, {
      shallow: true,
    });
  }, [sectionIndex]);

  // when the barterType changes,
  // add additional fields from the newly chosen type
  useEffect(() => {
    setFormSections((formSections) => {
      return formSections.map((formSection) => ({
        ...formSection,
        fields:
          formSection.name === "additionalInfo"
            ? ADDITIONAL_FIELDS[formData.barterType]
              ? [...ADDITIONAL_FIELDS[formData.barterType]]
              : []
            : formSection.fields,
      }));
    });
  }, [formData.barterType]);

  /**
   * Change field in the formData object
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));

    // console.log(formSections[sectionIndex].fields[fieldIndex].errors)

    const fieldIndex: number =
      parseInt(e.target.dataset.fieldindex as string) || 0;
    formSections[sectionIndex].fields[fieldIndex].errors = [];
    // if (e.target.value) {
    // }
  };

  /** Dispatch redux action to POST to backend when form is submitted */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-4 offset-lg-4">
          <form onSubmit={handleSubmit} className="bg-light p-5 mt-5 rounded shadow">
            <FormSection
              sectionData={formSections[sectionIndex]}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              barterType={formData.barterType}
              formData={formData}
              changeFormSection={changeFormSection}
              isLastSection={sectionIndex === (formSections.length - 1)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BarterCreateForm;
