import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { BARTER_TYPES, QUANTITY_UNITS } from "../../../common/constants";
import { titleize } from "../../../utils/helpers";
import FormSection from "./FormSection";
import _ from "lodash";
import { BarterFormData } from "../../../ts/interfaces/barters";
import { useRouter } from "next/router";
import { createBarter } from "../../../store/bartersSlice/actions";
import { unwrapResult } from "@reduxjs/toolkit";
import { createAlert } from "../../../store/alertSlice";
import { refreshToken, verifyToken } from "../../../store/authSlice/actions";
import Spinner from "../../Layout/Spinner";
import { useChangeFormSection } from "./hooks/useChangeFormSection";
import { useFormSections } from "./hooks/useFormSections";
import { validateSection } from "./utils";
import RouteProtector from "../../Layout/RouteProtector";

const BarterCreateForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { barterLoadingStatus } = useAppSelector(state => state.barters);
  // const [formErrors, setFormErrors] = useState<BarterFormErrors>({});

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

  const { formSections } = useFormSections(formData, setFormData);

  const {
    sectionIndex,
    changeFormSection,
    formErrors,
    setFormErrors
  } = useChangeFormSection({ formSections, formData });

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

  /** dispatch action to set an alert */
  const handleAlert = (id: number, text: string, level: string) => {
    dispatch(createAlert({ id, text, level }));
  };

  /** Dispatch redux action to POST to backend when form is submitted */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { sectionIsValid } = validateSection(
      formSections[sectionIndex],
      formData
    );

    if (sectionIsValid) {
      try {
        const verify = await verifyToken("access");
        await dispatch(refreshToken());

        const barterRes = await dispatch(
          createBarter({ formData: formData, user: user })
        ).then(unwrapResult);
        router.push("/");
        handleAlert(0, barterRes.message, "success");
      } catch (error) {
        router.push("/barters/create?step=1", undefined, {
          shallow: true
        });
        error.errors
          ? error.errors.forEach((error, index) => {
              handleAlert(index, error, "danger");
            })
          : handleAlert(
              0,
              "Something went wrong. Please try again later",
              "danger"
            );
      }
    }
    // setSectionIndex(0)
  };

  return (
    <RouteProtector>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-4 offset-lg-4">
            {!formSections[sectionIndex]
              ? <Spinner />
              : <form
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
    </RouteProtector>
  );
};

export default BarterCreateForm;
