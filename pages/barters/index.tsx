import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { BartersHomePageProps } from "../../ts/interfaces/barters";
import axios, { AxiosResponse } from "axios";
import BarterList from "../../components/Barters/BarterList";


const BartersHome = ({ barters }: BartersHomePageProps) => {
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector(state => state.auth);

  useEffect(() => {
    // dispatch(createBarter({...TEST_DATA, accessToken}))
  }, []);

  return (
    <main className="container-fluid h-100-percent">
      <BarterList barters={barters} />
    </main>
  );
};


export default BartersHome;
