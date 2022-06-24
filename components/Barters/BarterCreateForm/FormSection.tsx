import React, { useEffect, useState } from "react";
import { BARTER_ICONS } from "../../../constants";
import { BarterFormSectionProps } from "../../../ts/interfaces/barters";
import { titleize } from "../../../utils/helpers";
import { useAppSelector } from "../../../store/hooks";

const FormSection = ({
  sectionData,
  errors,
  handleChange,
  handleSubmit,
  formData,
  changeFormSection,
  isLastSection
}: BarterFormSectionProps) => {
  const { barterLoadingStatus } = useAppSelector(state => state.barters);

  return (
    <div className="row">
      {sectionData &&
        sectionData.name !== "iHave" &&
        <p className="h3 text-light-darker d-flex align-items-center gap-3">
          {BARTER_ICONS[formData.barterType] || ""}
          {titleize(formData.barterType || "")}
        </p>}
      <p className="display-4 m-0">
        {sectionData.headerText && titleize(sectionData.headerText)}
      </p>

      {sectionData.fields.map((field, i) => {
        switch (field.type) {
          // type of text renders input field with type of text
          case "text":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses}`}
                key={`field-${i}`}
              >
                <label htmlFor={field.name} className="h5 form-label">
                  {field.label}
                  {field.required
                    ? <span className="text-danger ms-1">*</span>
                    : ""}
                </label>
                <input
                  type="text"
                  name={field.name}
                  className={`form-control ${errors[field.name] &&
                  errors[field.name].length > 0
                    ? "is-invalid"
                    : ""}`}
                  onInput={e => handleChange(e)}
                  value={formData[field.name]}
                  data-fieldindex={i}
                  {...field.additionalProps}
                />
                {errors[field.name] &&
                  errors[field.name].length > 0 &&
                  errors[field.name].map(message =>
                    <p className="m-0 text-danger" key={message}>
                      {message}
                    </p>
                  )}
              </div>
            );
          // type of radio renders radio buttons
          case "radio":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses}`}
                key={`field-${i}`}
              >
                {field.required
                  ? <span className="text-danger ms-1">
                      *{" "}
                      {errors[field.name] &&
                        errors[field.name].length > 0 &&
                        errors[field.name].map(message =>
                          <span className="m-0 text-danger" key={message}>
                            {message}
                          </span>
                        )}
                    </span>
                  : ""}

                {field.choices.map((choice, j) =>
                  <div
                    className="mb-2 d-flex align-items-center is-invalid"
                    key={choice.label}
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      name={field.name}
                      value={choice.value}
                      onChange={e => handleChange(e)}
                      defaultChecked={formData[field.name] === choice.value} // if form state value equals radio value
                      data-fieldindex={i}
                      data-testid={`BarterTypeRadio-${choice.value}`}
                      {...field.additionalProps}
                    />

                    <span className="ms-2 lead fw-bold">
                      {choice.label}
                    </span>
                  </div>
                )}
              </div>
            );
          // type of checkbox renders checkboxes
          case "checkbox":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses}`}
                key={`field-${i}`}
              >
                {field.choices.map((choice, i) =>
                  <div className="d-flex " key={choice.label}>
                    <input
                      type="checkbox"
                      className={`form-check-input`}
                      onChange={e => handleChange(e)}
                      checked={formData[field.name] === true}
                      //   defaultChecked={false}
                      value={formData[field.name]}
                      name={field.name}
                      data-fieldindex={i}
                      {...field.additionalProps}
                    />
                    <span className="ms-2 fw-bold">
                      {choice.label}
                    </span>
                  </div>
                )}
              </div>
            );
          // type of number renders number field
          case "number":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses}`}
                key={`field-${i}`}
              >
                <label htmlFor={field.name} className="h5 form-label">
                  {field.label}
                  {field.required
                    ? <span className="text-danger ms-1">*</span>
                    : ""}
                </label>
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]} // value from form state
                  className={`form-control`}
                  //   className={`form-control ${(field.errors as string[]).includes(
                  //     field.name
                  //   )
                  //     ? "is-invalid"
                  //     : ""}`}
                  onInput={e => handleChange(e)}
                  data-fieldindex={i}
                  {...field.additionalProps}
                />
              </div>
            );

          // type of textArea renders textArea
          case "textArea":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses}`}
                key={`field-${i}`}
              >
                <label htmlFor={field.name} className="h5 form-label">
                  {field.label}
                  {field.required
                    ? <span className="text-danger ms-1">*</span>
                    : ""}
                </label>
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  rows={5}
                  className={`form-control ${errors[field.name] &&
                  errors[field.name].length > 0
                    ? "is-invalid"
                    : ""}`}
                  onInput={e => handleChange(e)}
                  data-fieldindex={i}
                  {...field.additionalProps}
                />
                {errors[field.name] &&
                  errors[field.name].length > 0 &&
                  errors[field.name].map(message =>
                    <p className="m-0 text-danger" key={message}>
                      {message}
                    </p>
                  )}
              </div>
            );

          // type of select renders select menu
          case "select":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses}`}
                key={`field-${i}`}
              >
                <label htmlFor={field.name} className="h5 form-label">
                  {field.label}
                </label>
                <select
                  className="form-select"
                  id={field.name}
                  onChange={e => handleChange(e)}
                  onBeforeInput={handleChange}
                  name={field.name}
                  value={formData[field.name]}
                  data-fieldindex={i}
                  {...field.additionalProps}
                >
                  {/* SELECT OPTIONS ARE PASSED AS OBJECTS */}
                  {Object.keys(field.options).map(key =>
                    <option value={key} key={key}>
                      {titleize(field.options[key])}
                    </option>
                  )}
                </select>
                {errors[field.name] &&
                  errors[field.name].length > 0 &&
                  errors[field.name].map(message =>
                    <p className="m-0 text-danger" key={message}>
                      {message}
                    </p>
                  )}
              </div>
            );
        }
      })}

      {/* REQUIRED LEGEND */}
      <p className="d-flex align-items-center mt-5">
        Required<span className="text-danger ms-2">*</span>
      </p>
      <div className="d-flex justify-content-between align-items-end">
        {/* BACK LINK */}
        <a
          onClick={e => changeFormSection("prev")}
          className="mt-3 p-0 link-primary text-decoration-none"
        >
          {sectionData.number !== "1 of 5" ? "Back" : ""}
        </a>

        <div className="d-flex-justify-content-center">
          {/* SECTION NUMBER e.g "1 of 5" */}
          <p className="lead m-0 text-center">
            {sectionData.number}
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
                ? barterLoadingStatus === "PENDING" ? "Loading..." : "Submit"
                : "Next"}
            </h5>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
