import React from "react";
import { BarterFormSectionProps } from "../../../ts/interfaces/barters";
import { titleize } from "../../../utils/helpers";

const FormSection = ({ sectionData }: BarterFormSectionProps) => {
  // console.log(sectionData)
  return (
    <div className="row">
      <p className="display-4 m-0">
        {titleize(sectionData.sectionName)}
      </p>

      {sectionData.fields.map(field => {
        switch (field.type) {
          // type of text renders input field with type of text
          case "text":
            return (
              <div className={`form-group mt-3 ${field.columnClasses}`}>
                <label htmlFor={field.name} className="h5 form-label">
                  {field.label}
                  {field.required
                    ? <span className="text-danger ms-1">*</span>
                    : ""}
                </label>
                <input type="text" name={field.name} className="form-control" />
              </div>
            );
          // type of radio renders radio buttons
          case "radio":
            return (
              <div className={`form-group mt-3 ${field.columnClasses}`}>
                {field.required
                  ? <span className="text-danger ms-1">*</span>
                  : ""}
                {field.choices.map((choice, i) =>
                  <div className="mb-2 d-flex align-items-center">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={field.name}
                      value={choice.value}
                      //   checked={} // if form state value equals radio value
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
              <div className={`form-group mt-3 ${field.columnClasses}`}>
                {field.choices.map(choice =>
                  <div className="d-flex align-items-center">
                    <input type="checkbox" className="form-check-input" />
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
              <div className={`form-group mt-3 ${field.columnClasses}`}>
                <label htmlFor={field.name} className="h5 form-label">
                  {field.label}
                  {field.required
                    ? <span className="text-danger ms-1">*</span>
                    : ""}
                </label>
                <input
                  type="number"
                  name={field.name}
                  // value={} // value from form state
                  className="form-control"
                  min={1}
                />
              </div>
            );

          // type of textArea renders textArea
          case "textArea":
            return (
              <div className={`form-group mt-3 ${field.columnClasses}`}>
                <label htmlFor={field.name} className="h5 form-label">
                  {field.label}
                  {field.required
                    ? <span className="text-danger ms-1">*</span>
                    : ""}
                </label>
                <textarea name={field.name} rows={5} className="form-control" />
              </div>
            );

          // type of select renders select menu
          case "select":
            return (
              <div className={`form-group mt-3 ${field.columnClasses}`}>
                <label htmlFor={field.name} className="h5 form-label">
                  {field.label}
                </label>
                <select className="form-select" id={field.name}>
                  {/* SELECT OPTIONS ARE PASSED AS OBJECTS */}
                  {Object.keys(field.options).map(key =>
                    <option value={key}>
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

      {/* SECTION NUMBER e.g "1 of 5" */}
      <p className="lead m-0 text-end">
        {sectionData.sectionNumber}
      </p>

      {/* SUBMIT/NEXT BUTTON */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary">
          <h5 className="m-0 text-warning">
            {sectionData.sectionNumber === "5 of 5" ? "Submit" : "Next"}
          </h5>
        </button>
      </div>

      {/* BACK LINK */}
      {sectionData.sectionNumber !== "1 of 5"
        ? <a href="" className="mt-3 p-0 link-primary text-decoration-none">
            Back
          </a>
        : ""}
    </div>
  );
};

export default FormSection;
