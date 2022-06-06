import React, { useEffect, useState } from "react";
import { BarterFormSectionProps } from "../../../ts/interfaces/barters";
import { titleize } from "../../../utils/helpers";
import { QUANTITY_UNITS } from "../../../constants";

const FormSection = ({
  sectionData,
  handleChange,
  handleSubmit,
  formData,
  changeFormSection
}: BarterFormSectionProps) => {
  const [isLastSection, setIsLastSection] = useState(false);
  useEffect(() => {
    setIsLastSection(sectionData.sectionName === "5 of 5");
  }, []);

  useEffect(
    () => {
      console.log(isLastSection);
    },
    [isLastSection]
  );

  return (
    <div className="row">
      <p className="display-4 m-0">
        {sectionData.sectionName && titleize(sectionData.sectionName)}
      </p>
      {sectionData.sectionNumber !== "1 of 5" &&
        <p>
          {/* display barter type */}
        </p>}

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
                  className={`form-control ${(field.errors as string[]).includes(
                    field.name
                  )
                    ? "is-invalid"
                    : ""}`}
                  onInput={(e)=>handleChange(e)}
                  value={formData[field.name]}
                  required={field.required}
                  data-fieldindex={i}
                  {...field.additionalProps}
                />
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
                  ? <span className="text-danger ms-1">*</span>
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
                      onChange={(e)=>handleChange(e)}
                      defaultChecked={formData[field.name] === choice.value} // if form state value equals radio value
                      required={field.required}
                      data-fieldindex={i}
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
                  <div className="d-flex align-items-center" key={choice.label}>
                    <input
                      type="checkbox"
                      className={`form-check-input ${(field.errors as string[]).includes(
                        field.name
                      )
                        ? "is-invalid"
                        : ""}`}
                      onChange={(e)=>handleChange(e)}
                      checked={formData[field.name]}
                      name={field.name}
                      required={field.required}
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
                  className={`form-control ${(field.errors as string[]).includes(
                    field.name
                  )
                    ? "is-invalid"
                    : ""}`}
                  onInput={(e)=>handleChange(e)}
                  required={field.required}
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
                  className={`form-control ${(field.errors as string[]).includes(
                    field.name
                  )
                    ? "is-invalid"
                    : ""}`}
                  onInput={(e)=>handleChange(e)}
                  required={field.required}
                  data-fieldindex={i}
                  {...field.additionalProps}
                />
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
                  onChange={(e)=>handleChange(e)}
                  onBeforeInput={handleChange}
                  name={field.name}
                  value={formData[field.name]}
                  required={field.required}
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
          onClick={e => changeFormSection(e, "prev")}
          className="mt-3 p-0 link-primary text-decoration-none"
        >
          {sectionData.sectionNumber !== "1 of 5" ? "Back" : ""}
        </a>
        <div className="d-flex-justify-content-center">
          {/* SECTION NUMBER e.g "1 of 5" */}
          <p className="lead m-0 text-center">
            {sectionData.sectionNumber}
          </p>
          {/* SUBMIT/NEXT BUTTON */}

          <button
            className="btn btn-secondary-dark"
            onClick={e =>
              isLastSection ? handleSubmit(e) : changeFormSection(e, "next")}
          >
            <h5 className="m-0 text-warning">
              {isLastSection ? "Submit" : "Next"}
            </h5>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
