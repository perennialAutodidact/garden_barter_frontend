import React from "react";
import { BarterListProps } from "../../ts/interfaces/barters";
import BarterItem from "./BarterItem";

const BarterList = ({ barters }: BarterListProps) => {
  return (
    <div className="row py-lg-5 g-1" data-testid="BarterList">
      {barters && barters.length > 0
        ? barters.map(barter => <BarterItem barter={barter} key={barter.uuid} />)
        : <h1 className="h1 text-center">No Barters</h1>}
    </div>
  );
};

export default BarterList;
