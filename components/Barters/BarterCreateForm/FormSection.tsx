import React, { useEffect, useState } from "react";
import { BARTER_ICONS } from "../../../common/constants";
import { BarterFormSectionProps } from "../../../ts/interfaces/barters";
import { titleize } from "../../../common/utils/helpers";
import { useAppSelector } from "../../../store/hooks";
import FormFields from "./FormFields";
import FormReview from "./FormReview";
import Spinner from "../../../common/components/Spinner"

const FormSection = ({
  sectionData,
  errors,
  handleChange,
  handleSubmit,
  formData,
  changeFormSection,
  isFirstSection,
  isLastSection,
  totalSections,
  allFormSections
}: BarterFormSectionProps) => {
  const { barterLoadingStatus } = useAppSelector(state => state.barters);

  return (
    <div className="row">
      {sectionData &&
        sectionData.name !== "iHave" &&
        <p className="h3 text-primary d-flex align-items-center gap-3">
          {titleize(formData.barterType || "")}
          {BARTER_ICONS[formData.barterType] || ""}
        </p>}
      <header className="display-4 m-0 d-flex">
        {sectionData.headerText && titleize(sectionData.headerText)}
      </header>

      {!isLastSection
        ? <FormFields
            fields={sectionData.fields}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        : <FormReview formData={formData} allFormSections={allFormSections} />}

      {/* REQUIRED LEGEND */}
      {!isLastSection &&
        <p className="d-flex align-items-center mt-5">
          Required<span className="text-danger ms-2">*</span>
        </p>}
      <div className="d-flex justify-content-between align-items-end">
        {/* BACK LINK */}
        <a
          onClick={e => changeFormSection("prev")}
          className="mt-3 p-0 link-primary text-decoration-none"
        >
          {isFirstSection ? "" : "Back"}
        </a>

        <div className="d-flex-justify-content-center">
          {/* SECTION NUMBER e.g "1 of 6" */}
          <p className="lead m-0 text-center">
            {sectionData.number} of {totalSections}
          </p>

          {/* SUBMIT/NEXT BUTTON */}
          <button
            className="btn btn-secondary-dark"
            onClick={e => {
              e.preventDefault();
              isLastSection ? handleSubmit(e) : changeFormSection("next");
            }}
            data-testid="BarterCreateFormButton"
          >
            <h5 className="m-0 text-warning">
              {isLastSection
                ? barterLoadingStatus === "PENDING" ? <Spinner/> : "Submit"
                : "Next"}
            </h5>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
