import React, { useState, Fragment } from "react";
import { BarterItemProps } from "../../../ts/interfaces/barters";
import BarterIcon from "../BarterIcon";
import { titleize } from "../../../common/utils/helpers";
import { humanizeDateDistance } from "../utils";
import Link from "next/link";

const BarterItem = ({ barter, showAllFields = false }: BarterItemProps) => {
  const [dateCreated, _] = useState<string>(
    humanizeDateDistance(barter.dateCreated.toString())
  );

  const WillTradeFor = (): JSX.Element =>
    <p className="mb-3">
      {barter.isFree ? "Free (no trade required)" : barter.willTradeFor}
    </p>;

  const Quantity = (): JSX.Element =>
    <div className="col-12">
      <p className="m-0 fw-bold">Quantity</p>
      <p className="mb-3">{`${barter.quantity} ${barter.quantityUnits}`}</p>
    </div>;

  const CrossStreets = (): JSX.Element =>
    <Fragment>
      <p className="m-0 fw-bold">Intersection</p>
      <p className="mb-3">
        {barter.crossStreet1} @ {barter.crossStreet2}
      </p>
    </Fragment>;

  return (
    <div className="col-10 offset-1 col-lg-8 offset-lg-2 text-dark" data-testid='BarterItem'>
      <div className="row mt-5 bg-light position-relative rounded-top">
        <div className="py-2 px-3 d-flex align-items-center justify-content-between bg-light-dark rounded-top">
          <div className="d-flex">
            <BarterIcon barterType={barter.barterType} />
            <div className="h2 m-0 ms-3 text-primary-dark">
              {titleize(barter.barterType)}
            </div>
          </div>
          <Link
            href={{
              pathname: `/barters/[barterType]/[barterId]`,
              query: { barterType: barter.barterType, barterId: barter.uuid }
            }}
          >
            <a className="link-dark">More</a>
          </Link>
        </div>
        <div className="col-12 col-lg-6 pt-3 pb-lg-3 ps-lg-3">
          <div className={"col-12"}>
            <h3 className="h3 mb-lg-3">
              {barter.title}
            </h3>
          </div>
          <div className={"col-12"}>
            <p data-testid="BarterDescription">
              {barter.description}
            </p>
          </div>

          {barter.quantity && barter.quantityUnits && <Quantity />}
          {barter.genus && <Quantity />}
          {/* {barter.quantity && barter.quantityUnits && <Quantity />} */}
          {/* {barter.quantity && barter.quantityUnits && <Quantity />} */}
          {/* {barter.quantity && barter.quantityUnits && <Quantity />} */}
        </div>

        <div className="col-12 col-lg-6 pb-3 pt-lg-3 pb-lg-5 pe-lg-3 bg-light rounded-top">
          <div className="h3 m-0 mb-lg-3 d-flex align-items-center justify-content-between">
            Trade
          </div>
          <p className="text-dark m-0" data-testid="WillTradeFor">
            {barter.willTradeFor || "No trade required. This item is free."}
          </p>
        </div>
      </div>
      <div className="row bg-light-dark text-dark mb-2 rounded-bottom border-top border-primary ">
        <div className="col-12 p-2 ps-3">
          {dateCreated} |{" "}
          {barter.creator.username ? barter.creator.username : "Anonymous"}
        </div>
      </div>
    </div>
  );
};

export default BarterItem;
