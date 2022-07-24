import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { BARTER_TYPES, QUANTITY_UNITS } from "../../../constants";
import { titleize } from "../../../utils/helpers";
import FormSection from "./FormSection";
import _ from "lodash";
import {
  BarterFormData,
  BarterFormSectionData,
  BarterFormErrors
} from "../../../ts/interfaces/barters";
import { barterFormDataSchemaPartial } from "../../../ts/validation/barters";
import { useRouter } from "next/router";
import { createBarter } from "../../../store/bartersSlice/actions";
import { unwrapResult } from "@reduxjs/toolkit";
import { createAlert } from "../../../store/alertSlice";
import dayjs from "dayjs";
import { refresh } from "../../../store/authSlice/actions";
import { formSectionsData } from "./formSectionsData";
import Spinner from "../../Layout/Spinner";

const BarterCreateForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { barterLoadingStatus } = useAppSelector(state => state.barters);
  const [currentYear, _] = useState<number>(new Date().getFullYear());
  const [formErrors, setFormErrors] = useState<BarterFormErrors>({});

  // These fields will be rendered on each page of the form
  const PLANT_FIELDS = [
    {
      name: "genus",
      type: "text",
      value: "",
      label: "Genus",
      required: false,
      additionalProps: {}
    },
    {
      name: "species",
      type: "text",
      value: "",
      label: "Species",
      required: false,
      additionalProps: {}
    },
    {
      name: "commonName",
      type: "text",
      value: "",
      label: "Common Name",
      required: false,
      additionalProps: {}
    }
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
        columnClasses: "col-12 col-lg-6"
      }
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
        columnClasses: "col-12"
      }
    ],
    tool: [
      {
        name: "dimensions",
        type: "text",
        value: "",
        label: "Dimensions",
        required: false,
        additionalProps: { placeholder: "Height x Width x Depth" },
        columnClasses: "col-12"
      }
    ]
  };

  // fields required for all barters
//   const requiredFields = {
//     title: "Rake",
//     description:
//       "I have two identical rakes. Getting rid of one to make space.",
//     postalCode: "97233",
//     willTradeFor: "Black plastic planter pots",
//     isFree: false,
//     quantity: "",
//     quantityUnits: "NA",
//     barterType: "tool"
//   };

//   fields required for all barters
    const requiredFields = {
      title: "",
      description: "",
      postalCode: "",
      willTradeFor: "",
      isFree: false,
      quantity: "",
      quantityUnits: "NA",
      barterType: ""
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
    crossStreet2: ""
  });

  // sectionIndex controls which formSection is currently showing
  const [sectionIndex, setSectionIndex] = useState<number>(
    parseInt((router.query.step as string) || "0")
  );

  // meta data for rendering form sections
  const [formSections, setFormSections] = useState<BarterFormSectionData[]>(
    formSectionsData
  );

  /**
   * Return true if required fields for each section are filled out with valid values, otherwise return false
   */
  const validateSection = (sectionData: BarterFormSectionData): boolean => {
    let sectionIsValid = true;

    const sectionFields = sectionData.fields
      .filter(field => field.required)
      .map(field => ({ [field.name]: formData[field.name] }));

    const validationErrors = {};
    sectionFields.forEach(field => {
      const { success, error } = barterFormDataSchemaPartial.safeParse(field);

      // if zod validation produced errors,
      // compile them into validationErrors
      if (!success) {
        sectionIsValid = false;

        // loop through each validation issue
        error.issues.forEach(issue => {
          // use the field name as the key
          const fieldName = issue.path[0];
          // collate array of error messages for the field
          validationErrors[fieldName] = [
            ...(validationErrors[fieldName] || []),
            issue.message
          ];
        });
        setFormErrors(validationErrors);
      }

      // check that a trade is specified or the item is free
      if (sectionData.name === "willTradeFor") {
        if (formData["willTradeFor"] === "" && !formData["isFree"]) {
          sectionIsValid = false;

          setFormErrors({
            ...formErrors,
            willTradeFor: ["A trade is required if the item is not free."]
          });
        } else if (formData["willTradeFor"] !== "" && formData["isFree"]) {
          sectionIsValid = false;

          setFormErrors({
            ...formErrors,
            willTradeFor: ["Free items do not require trades."]
          });
        }
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
          quantityUnits: ["Please choose a unit."]
        });
      }
    });

    console.log(validationErrors)
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
        if (sectionIsValid) {
          if (sectionIndex < formSections.length - 1) {
            setSectionIndex(sectionIndex => sectionIndex + 1);
          }
        }
        break;
      case "prev":
        if (sectionIndex > 0) {
          // clear all form errors
          setFormErrors({});

          setSectionIndex(sectionIndex => sectionIndex - 1);
        }
        break;
    }
  };

  // when the page loads, set url parameter to step 1
  // when the url parameter updates, update the sectionIndex
  useEffect(
    () => {
      if (router && router !== null && router !== undefined) {
        if (
          router.query.step &&
          parseInt(router.query.step as string) < formSections.length - 1
        ) {
          setSectionIndex(parseInt(router.query.step as string) - 1);
        } 
      }
    },
    [router]
  );

  // when the sectionIndex updates, update the url parameter
  useEffect(
    () => {
      if (router && router !== null && router !== undefined) {  
        if (sectionIndex < formSections.length) {
          router.push(
            `/barters/create/?step=${sectionIndex+1}`,
            undefined,
            {
              shallow: true
            }
          );
        }
      }
    },
    [sectionIndex, formSections]
  );

  // when the barterType changes,
  // add additional fields from the newly chosen type
  useEffect(
    () => {
      formData.barterType &&
        ADDITIONAL_FIELDS[formData.barterType].forEach(field => {
          setFormData(formData => ({
            ...formData,
            [field.name]: field.value
          }));
        });
      setFormSections(formSections => {
        return formSections.map(formSection => {
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
    },
    [formData.barterType]
  );

  /**
   * Change field in the formData object
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, [e.target.name]: [] });

    if (e.target.type === "checkbox") {
      if (e.target.name === "isFree") {
        setFormErrors({ ...formErrors, willTradeFor: [] });
      }
      setFormData(formData => ({
        ...formData,
        [e.target.name]: !formData[e.target.name]
      }));
    } else {
      setFormData(formData => ({
        ...formData,
        [e.target.name]: e.target.value
      }));
    }
  };

  /** Dispatch redux action to POST to backend when form is submitted */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (validateSection(formSections[sectionIndex])) {
      dispatch(refresh()).then(res => {
        dispatch(createBarter({ formData: formData, user: user }))
          .then(unwrapResult)
          .then(res => {
            router.push("/");
            dispatch(
              createAlert({
                id: 0,
                text: res.message,
                level: "success"
              })
            );
          })
          .catch(err => {
            console.log("create barter error", err);
            router.push("/barters/create/?step=1", undefined, {
              shallow: true
            });
            if (err.errors) {
                err.errors.forEach((error, index) => {
                  dispatch(
                    createAlert({
                      id: index,
                      text: error,
                      level: "danger"
                    })
                  );
                });
            } else {
                dispatch(
                  createAlert({
                    id: 0,
                    text: "Something went wrong. Please try again later",
                    level: "danger"
                  })
                );
            }
          });
      });
    }
    // setSectionIndex(0)
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-4 offset-lg-4">
          {!formSections[sectionIndex]? <Spinner /> :
            <form
              onSubmit={handleSubmit}
              className="bg-light p-3 p-lg-5 mt-5 rounded shadow"
            >
              <FormSection
                sectionData={formSections[sectionIndex]}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                barterType={formData.barterType}
                formData={formData}
                allFormSections={formSections}
                changeFormSection={changeFormSection}
                totalSections={formSections.length.toString()}
                isFirstSection={sectionIndex === 0}
                isLastSection={sectionIndex === formSections.length - 1}
                errors={formErrors}
              />
            </form>}
        </div>
      </div>
    </div>
  );
};

export default BarterCreateForm;
