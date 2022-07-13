import React, { Fragment, useMemo } from "react";

import { BarterFormReviewSectionProps } from "../../../ts/interfaces/barters";
import { formSectionsData } from "./formSectionsData";
import { QUANTITY_UNITS } from "../../../constants";

const FormReviewSection = ({
  formData,
  allFormSections
}: BarterFormReviewSectionProps) => {

  const getWillTradeForValue = (): React.ReactNode =>
    <p className="mb-3">
      {formData.isFree ? "Free (no trade required)" : formData.willTradeFor}
    </p>;

  const getQuantity = (): React.ReactNode =>
    <p className="mb-3">
      {`${formData.quantity} ${QUANTITY_UNITS[formData.quantityUnits]}`}
    </p>;

  return (
    <Fragment>
      {allFormSections.map(
        formSection =>
          formSection.name !== "iHave" &&
          formSection.name !== "review" &&
          <div className="row" key={formSection.name}>
            {formSection.fields.map(
              field =>
                ((field.name !== "quantityUnits" && formData[field.name]) ||
                  (field.name === "willTradeFor" &&
                    !formData[field.name] &&
                    formData.isFree)) &&
                <div className={`text-break ${field.columnClasses || ""}`} key={field.name}>
                  <h5 className="m-0">
                    {field.label}
                  </h5>
                  {field.name === "willTradeFor"
                    ? getWillTradeForValue()
                    : field.name === "quantity" && formData.quantityUnits
                      ? getQuantity()
                      : field.name !== "isFree" &&
                        <p className="mb-3">
                          {formData[field.name]}
                        </p>}
                </div>
            )}
          </div>
      )}
    </Fragment>
  );
};

export default FormReviewSection;
