import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { BarterListProps } from "../../ts/interfaces/barters";
import BarterItem from "./BarterItem";

const BarterList = ({ barters }: BarterListProps) => {
  const dispatch = useAppDispatch();

  console.log('>> barters', JSON.stringify(barters))
  return (
    <div className="row py-5">
      {barters && barters.length > 0
        ? barters.map(barter =>
            <BarterItem barter={barter} key={barter.id}/>
          )
        : <h1 className="h1">No Barters</h1>}
    </div>
  );
};

export const getServerSideProps = async () => {
  let barters = [];

  barters = await axios.get("/barters", {}).then(response=>response.data.barters);

    console.log('>> barters', barters)

  if (!barters) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      barters: barters
    }
  };
};

export default BarterList;
