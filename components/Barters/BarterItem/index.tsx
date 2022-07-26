import React, { useState, useRef, ReactNode } from "react";
import { BarterItemProps } from "../../../ts/interfaces/barters";
import { ArrowButton } from "../ArrowButton";
import BarterIcon from "../BarterIcon";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { titleize } from "../../../utils/helpers";
import ExtraFields from "./ExtraFields";

dayjs.extend(relativeTime);

const BarterItem = ({ barter, showAllFields = false }: BarterItemProps) => {
  const [dateCreated, _] = useState<Dayjs>(dayjs(barter.dateCreated));

  return (
    <div className="col-10 offset-1 col-lg-8 offset-lg-2 text-dark">
      <div className="row mt-5 bg-light position-relative rounded-top">
        <div className="py-2 px-3 d-flex align-items-center justify-content-between bg-light-dark rounded-top">
          <div className="d-flex">
            <BarterIcon barterType={barter.barterType} />
            <div className="h1 m-0 ms-3 text-primary-dark">
              {titleize(barter.barterType)}
            </div>
          </div>
          {!showAllFields && <ArrowButton hrefUrl="/barters" barter={barter} />}
        </div>
        <div className="col-12 col-lg-6 pt-3 pb-lg-3 ps-lg-3">
          <div className="row">
            <div className={"col-12"}>
              <h4 className="h3 mb-lg-3">
                {barter.title}
              </h4>
            </div>
            <div className={"col-12"}>
              <p data-testid="BarterDescription">
                {barter.description}
              </p>
            </div>

            <ExtraFields
              barter={barter}
              fieldNames={[
                "quantity",
                "datePackaged",
                "genus",
                "species",
                "commonName",
                "dateHarvested",
                "dimensions"
              ]}
            />
          </div>
        </div>
        <ExtraFields
          barter={barter}
          fieldNames={["postalCode", "crossStreet1", "crossStreet2"]}
        />
        <div className="col-12 col-lg-6 pb-3 pt-lg-3 pb-lg-5 pe-lg-3 bg-light rounded-top">
          {/* <div className="row"> */}
          {/* <div className="col-9 d-flex flex-column"> */}

          <div className="h3 m-0 mb-lg-3 d-flex align-items-center justify-content-between">
            Trade For
          </div>
          <p className="text-dark m-0 border-bottom" data-testid="WillTradeFor">
            {barter.willTradeFor || "No trade required. This item is free."}
          </p>
          {/* </div> */}
          {/* </div> */}
        </div>
        
      </div>
      <div className="row bg-light-dark text-dark mb-2 rounded-bottom border-top border-primary ">
        <div className="col-12 p-2 ps-3">
          {dateCreated.from(dayjs())[0].toUpperCase() +
            dateCreated.from(dayjs()).slice(1)}{" "}
          | {barter.creator.username ? barter.creator.username : "Anonymous"}
        </div>
      </div>
    </div>
  );
};

export default BarterItem;
