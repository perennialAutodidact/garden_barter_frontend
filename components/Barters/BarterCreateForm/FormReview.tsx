import React, { Fragment, useMemo } from "react";

import { BarterFormReviewSectionProps } from "../../../ts/interfaces/barters";
import { formSectionsData } from "./formSectionsData";
import { QUANTITY_UNITS } from "../../../constants";

const FormReviewSection = ({ formData }: BarterFormReviewSectionProps) => {
  const getWillTradeForValue = (): string =>
    formData.isFree ? "Free (no trade required)" : formData.willTradeFor;

  const getQuantity = (): string =>
    `${formData.quantity} ${QUANTITY_UNITS[formData.quantityUnits]}`;

  return (
    <Fragment>
      {formSectionsData.map(
        formSection =>
          formSection.name !== "iHave" &&
          formSection.name !== "review" &&
          <div className="row">
            {formSection.fields.map(
              field =>
                field.name !== "quantityUnits" &&
                <div
                  className={`ps-3 mb-3 text-break ${field.columnClasses ||
                    ""}`}
                >
                  <h5 className="m-0">
                    {field.label}
                  </h5>
                  {field.name === "willTradeFor"
                    ? getWillTradeForValue()
                    : field.name === "quantity" && formData.quantityUnits
                      ? getQuantity()
                      : formData[field.name]}
                </div>
            )}
          </div>
      )}
    </Fragment>
  );
};

export default FormReviewSection;
