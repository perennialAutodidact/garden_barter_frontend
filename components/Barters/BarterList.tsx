import React from "react";
import { BarterListProps } from "../../ts/interfaces/barters";
import BarterItem from "./BarterItem";

const BarterList = ({ barters }: BarterListProps) => {
  return (
    <div className="row py-5">
      {barters && barters.length > 0
        ? barters.map(barter => <BarterItem barter={barter} key={barter.id} />)
        : <h1 className="h1 text-center">No Barters</h1>}
    </div>
  );
};

export default BarterList;
