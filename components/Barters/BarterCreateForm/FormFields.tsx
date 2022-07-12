import React, { Fragment } from "react";
import { titleize } from "../../../utils/helpers";
import { BarterFormInputProps } from "../../../ts/interfaces/barters";

function FormFields({
  fields,
  formData,
  errors,
  handleChange,
  handleSubmit
}: BarterFormInputProps) {
  return (
    <Fragment>
      {fields.map((field, i) => {
        switch (field.type) {
          // type of text renders input field with type of text
          case "text":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses || ""}`}
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
                  id={field.name}
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
                    <p
                      className="m-0 text-danger"
                      data-testid={`BarterFormError-${field.name}`}
                      key={message}
                    >
                      {message}
                    </p>
                  )}
              </div>
            );
          // type of radio renders radio buttons
          case "radio":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses || ""}`}
                key={`field-${i}`}
              >
                {field.required
                  ? <span className="text-danger ms-1">
                      *{" "}
                      {errors[field.name] &&
                        errors[field.name].length > 0 &&
                        errors[field.name].map(message =>
                          <span
                            className="m-0 text-danger"
                            data-testid={`BarterFormError-${field.name}`}
                            key={message}
                          >
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
                      id={field.name}
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
                className={`form-group mt-3 ${field.columnClasses || ""}`}
                key={`field-${i}`}
              >
                {field.choices.map((choice, i) =>
                  <div className="d-flex " key={choice.label}>
                    <input
                      type="checkbox"
                      id={field.name}
                      className={`form-check-input`}
                      onChange={e => handleChange(e)}
                      checked={formData[field.name]}
                      //   value={formData[field.name]}
                      name={field.name}
                      data-fieldindex={i}
                      {...field.additionalProps}
                    />
                    <label htmlFor={field.name} className="ms-2 fw-bold">
                      {choice.label}
                    </label>
                  </div>
                )}
              </div>
            );
          // type of number renders number field
          case "number":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses || ""}`}
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
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]} // value from form state
                  className={`form-control`}
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
                className={`form-group mt-3 ${field.columnClasses || ""}`}
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
                  id={field.name}
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
                    <p
                      className="m-0 text-danger"
                      data-testid={`BarterFormError-${field.name}`}
                      key={message}
                    >
                      {message}
                    </p>
                  )}
              </div>
            );

          // type of select renders select menu
          case "select":
            return (
              <div
                className={`form-group mt-3 ${field.columnClasses || ""}`}
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
                    <p
                      className="m-0 text-danger"
                      data-testid={`BarterFormError-${field.name}`}
                      key={message}
                    >
                      {message}
                    </p>
                  )}
              </div>
            );
        }
      })}
    </Fragment>
  );
}

export default FormFields;
