import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { BARTER_TYPES, QUANTITY_UNITS } from "../../../constants";
import { titleize } from "../../../utils/helpers";
import FormSection from "./FormSection";
import _ from "lodash";
import {
  BarterFormData,
  BarterFormSectionData,
  BarterFormErrors,
} from "../../../ts/interfaces/barters";
import { barterFormDataSchemaPartial } from "../../../ts/validation/barters";
import { useRouter } from "next/router";
import { createBarter } from "../../../store/bartersSlice/actions";
import { unwrapResult } from "@reduxjs/toolkit";
import { createAlert } from "../../../store/alertSlice";
import { User } from "../../../ts/interfaces/auth";
import dayjs from "dayjs";
import { refresh } from "../../../store/authSlice/actions";

const BarterCreateForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { alerts } = useAppSelector((state) => state.alerts);
  const [currentYear, _] = useState<number>(new Date().getFullYear());
  const [formErrors, setFormErrors] = useState<BarterFormErrors>({});
  const [lastCompletedSection, setLastCompletedSection] = useState(0);

  // These fields will be rendered on each page of the form
  const PLANT_FIELDS = [
    {
      name: "genus",
      type: "text",
      value: "",
      label: "Genus",
      required: false,
      additionalProps: {},
    },
    {
      name: "species",
      type: "text",
      value: "",
      label: "Species",
      required: false,
      additionalProps: {},
    },
    {
      name: "commonName",
      type: "text",
      value: "",
      label: "Common Name",
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
        value: dayjs().year(),
        label: "Year Packaged",
        required: false,
        additionalProps: { value: currentYear, max: currentYear },
      },
    ],
    plant: [...PLANT_FIELDS],
    produce: [...PLANT_FIELDS],
    material: [
      {
        name: "dimensions",
        type: "text",
        value: "",
        label: "Dimensions",
        required: false,
        additionalProps: { placeholder: "Height x Width x Depth" },
      },
    ],
    tool: [
      {
        name: "dimensions",
        type: "text",
        value: "",
        label: "Dimensions",
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
    quantity: "",
    quantityUnits: "NA",
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
    parseInt((router.query.step as string) || "0")
  );

  // meta data for rendering form sections
  const [formSections, setFormSections] = useState<BarterFormSectionData[]>([
    {
      name: "iHave",
      headerText: "I have...",
      number: "1 of 5",
      fields: [
        {
          name: "barterType",
          type: "radio",
          required: true,
          additionalProps: {},
          choices: BARTER_TYPES.map((barterType) => ({
            label: titleize(barterType),
            value: barterType,
          })),
        },
      ],
    },
    {
      name: "generalInfo",
      headerText: "general info",
      number: "2 of 5",
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          required: true,
          additionalProps: {},
        },
        {
          type: "textArea",
          name: "description",
          label: "Description",
          required: true,
          additionalProps: {},
        },

        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          required: false,
          additionalProps: { min: 1 },
          columnClasses: "col-6",
        },
        {
          name: "quantityUnits",
          type: "select",
          label: "Unit",
          required: false,
          additionalProps: {},
          options: QUANTITY_UNITS,
          columnClasses: "col-6",
        },
      ],
    },
    {
      name: "additionalInfo",
      headerText: "additional info",
      number: "3 of 5",
      fields: [
        //calculate additional fields
      ],
    },
    {
      name: "willTradeFor",
      headerText: "will trade for",
      number: "4 of 5",
      fields: [
        {
          name: "willTradeFor",
          type: "textArea",
          required: true,
          additionalProps: {},
          label: "Will Trade For",
        },
        {
          name: "isFree",
          type: "checkbox",
          required: false,
          additionalProps: {},
          choices: [{ label: "Free (No Trade Required)", value: "" }],
        },
      ],
    },
    {
      name: "location",
      headerText: "location",
      number: "5 of 5",
      fields: [
        {
          name: "crossStreet1",
          type: "text",
          required: false,
          additionalProps: {},
          label: "Street",
          columnClasses: "col-6",
        },

        {
          name: "crossStreet2",
          type: "text",
          required: false,
          additionalProps: {},
          label: "Cross Street",
          columnClasses: "col-6",
        },
        {
          name: "latitude",
          type: "text",
          required: false,
          additionalProps: {},
          label: "Latitude",
          columnClasses: "col-6",
        },
        {
          name: "longitude",
          type: "text",
          required: false,
          additionalProps: {},
          label: "Longitude",
          columnClasses: "col-6",
        },
        {
          name: "postalCode",
          type: "text",
          required: true,
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

    const sectionFields = sectionData.fields
      .filter((field) => field.required)
      .map((field) => ({ [field.name]: formData[field.name] }));

    const validationErrors = {};
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
            issue.message,
          ];
        });
        setFormErrors(validationErrors);
      }

      // check that a trade is specified or the item is free
      if (
        sectionData.name === "willTradeFor" &&
        formData["willTradeFor"] === "" &&
        !formData["isFree"]
      ) {
        sectionIsValid = false;

        setFormErrors({
          ...formErrors,
          willTradeFor: ["A trade is required if the item is not free."],
        });
      }

      // check that a unit is entered if the quantity is entered
      if (
        sectionData.name === "generalInfo" &&
        formData.quantity &&
        formData.quantityUnits === "NA"
      ) {
        sectionIsValid = false;

        setFormErrors({
          ...formErrors,
          quantityUnits: ["Please choose a unit."],
        });
      }
    });

    return sectionIsValid;
  };

  /**
   * Increment or decrement the sectionIndex state
   * variable based on the direction paramater
   */
  const changeFormSection = (direction: "next" | "prev") => {
    const sectionIsValid = validateSection(formSections[sectionIndex]);
    switch (direction) {
      case "next":
        if (sectionIsValid && sectionIndex < formSections.length - 1) {
          if (sectionIndex < formSections.length) {
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

  // if the page loads with a step in the url query
  //and that form section hasn't been completed,
  // change form section to last completed section
  // useEffect(() => {
  //   if (router && router !== null && router !== undefined) {
  //     if (router.query.step) {
  //       const step = parseInt(router.query.step as string);
  //       if (step > lastCompletedSection && step < formSections.length) {
  //         router.push(`create/?step=${lastCompletedSection + 1}`, undefined, {
  //           shallow: true,
  //         });
  //       }
  //     }
  //   }
  // }, [router.query]);

  // when the page loads, set url parameter to step 1
  // when the url parameter updates, update the sectionIndex
  useEffect(() => {
    if (router && router !== null && router !== undefined) {
      if (
        router.query.step &&
        parseInt(router.query.step as string) < formSections.length
      ) {
        setSectionIndex(
          (sectionIndex) => parseInt(router.query.step as string) - 1
        );
      } else {
        // router.push(
        //   `/barters/create/?step=1`,
        //   {},
        //   // { query: { step: (sectionIndex + 1).toString() } },
        //   {
        //     shallow: true,
        //   }
        // );
      }
    }
  }, [router]);

  // when the sectionIndex updates, update the url parameter
  useEffect(() => {
    // console.log("sectionIndex", sectionIndex);
    // console.log("formSections.length-1", formSections.length-1);
    if (router && router !== null && router !== undefined) {
      if (sectionIndex < formSections.length - 1) {
        router.push(`/barters/create/?step=${sectionIndex + 1}`, undefined, {
          shallow: true,
        });
      }
    }
  }, [sectionIndex, formSections]);

  // when the barterType changes,
  // add additional fields from the newly chosen type
  useEffect(() => {
    formData.barterType &&
      ADDITIONAL_FIELDS[formData.barterType].forEach((field) => {
        setFormData((formData) => ({
          ...formData,
          [field.name]: field.value,
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
              : formSection.fields,
        };
      });
    });
  }, [formData.barterType]);

  /**
   * Change field in the formData object
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, [e.target.name]: [] });

    if (e.target.type === "checkbox") {
      setFormData((formData) => ({
        ...formData,
        [e.target.name]: !formData[e.target.name],
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  /** Dispatch redux action to POST to backend when form is submitted */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (validateSection(formSections[sectionIndex])) {
      dispatch(refresh()).then((res) => {
        dispatch(createBarter({ formData: formData, user: user }))
          .then(unwrapResult)
          .then((res) => {
            router.push("/");
            dispatch(
              createAlert({
                id: 0,
                text: res.message,
                level: "success",
              })
            );
          })
          .catch((err) => {
            router.push("/barters/create/?step=1", undefined, {
              shallow: true,
            });
            if (err.errors) {
              err.errors.forEach((error, index) => {
                dispatch(
                  createAlert({
                    id: index,
                    text: error,
                    level: "danger",
                  })
                );
              });
            } else {
              dispatch(
                createAlert({
                  id: 0,
                  text: "Something went wrong. Please try again later",
                  level: "danger",
                })
              );
            }
          });
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-4 offset-lg-4">
          <form
            onSubmit={handleSubmit}
            className="bg-light p-5 mt-5 rounded shadow"
          >
            <FormSection
              sectionData={formSections[sectionIndex]}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              barterType={formData.barterType}
              formData={formData}
              changeFormSection={changeFormSection}
              isLastSection={sectionIndex === formSections.length - 1}
              errors={formErrors}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BarterCreateForm;
