import React from "react";
import { BartersHomePageProps } from "../../ts/interfaces/barters";
import BarterList from "../../components/Barters/BarterList";

const BartersHome = ({ barters }: BartersHomePageProps) => {
  return (
    <main className="container-fluid">
      <BarterList barters={barters} />
    </main>
  );
};


export default BartersHome;
