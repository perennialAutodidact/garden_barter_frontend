import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { BartersHomePageProps } from "../../ts/interfaces/barters";
import BarterList from "../../components/Barters/BarterList";
import axios, { AxiosResponse } from "axios";

const BartersHome = ({ barters }: BartersHomePageProps) => {
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector(state => state.auth);

  return (
    <main className="container-fluid h-100-percent">
      <BarterList barters={barters} />
    </main>
  );
};


export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<BartersHomePageProps>> => {
  try {
    const res: AxiosResponse = await axios.get("/barters/", {});
    
    return {
      props: {
        barters: res.data.barters
      }
    };
  } catch (err) {
    console.log("barterSSProps", err);
    return {
      notFound: true
    };
  }
};
export default BartersHome;
