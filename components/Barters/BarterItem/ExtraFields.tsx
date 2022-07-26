import React, { Fragment, useState } from "react";
import { Barter, BarterFormData } from "../../../ts/interfaces/barters";
import { useFormSections } from "../BarterCreateForm/hooks/useFormSections";
import { QUANTITY_UNITS } from "../../../constants";
interface ExtraFieldsProps {
  barter: Barter;
  fieldNames: string[];
}

const ExtraFields = ({ barter, fieldNames }: ExtraFieldsProps) => {
  const [barterData, setBarterData] = useState<BarterFormData>(barter);
  const { formSections } = useFormSections(barterData, setBarterData);

  const getWillTradeForValue = (): React.ReactNode =>
    <p className="mb-3">
      {barter.isFree ? "Free (no trade required)" : barter.willTradeFor}
    </p>;

  const getQuantity = (): React.ReactNode =>
    <p className="mb-3">
      {`${barter.quantity} ${barter.quantityUnits}`}
    </p>;

  return (
    <Fragment>
      {formSections.map(
        formSection =>
          formSection.name !== "iHave" &&
          formSection.name !== "review" &&
          <div className="row" key={formSection.name}>
            {formSection.fields.map(
              field =>
                fieldNames.includes(field.name) &&
                barter[field.name] &&
                <div
                  className={`text-break ${field.columnClasses || ""}`}
                  key={field.name}
                >
                  <p className="m-0 fw-bold">
                    {field.label}
                  </p>
                  {field.name === "willTradeFor"
                    ? getWillTradeForValue()
                    : field.name === "quantity" && barter.quantityUnits
                      ? getQuantity()
                      : field.name !== "isFree" &&
                        <p className="mb-3">
                          {barter[field.name]}
                        </p>}
                </div>
            )}
          </div>
      )}
    </Fragment>
  );
};

export default ExtraFields;
