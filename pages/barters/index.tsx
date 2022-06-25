import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BartersHomePageProps } from "../../ts/interfaces/barters";
import BarterList from "../../components/Barters/BarterList";
import { resetAuthLoadingStatus } from "../../store/authSlice";

const BartersHome = ({ barters }: BartersHomePageProps) => {
  const dispatch = useAppDispatch();

  return (
    <main className="container-fluid">
      <BarterList barters={barters} />
    </main>
  );
};


export default BartersHome;
