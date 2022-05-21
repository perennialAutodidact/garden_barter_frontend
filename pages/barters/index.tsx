import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { BartersHomePageProps } from "../../ts/interfaces/barters";
import axios, { AxiosResponse } from "axios";

const BartersHome = ({ barters }: BartersHomePageProps) => {
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector(state => state.auth);

  useEffect(() => {
    // dispatch(createBarter({...TEST_DATA, accessToken}))
  }, []);

  return <div>BartersHome</div>;
};

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<BartersHomePageProps>> => {
  //   const res = await fetch({
  //       url: 'http://localhost:8000'
  //   })
  const BASE_URL: string =
    process.env.NODE_ENV === "development"
      ? process.env.BASE_URL_DEVELOPMENT
      : process.env.BASE_URL_PRODUCTION;


    try {
        const res:AxiosResponse = await axios.get(BASE_URL + '/barters', {

        })
        console.log(res.data)
    } catch(err){
        console.log(err.response.data);

    }

  const barters = [];

  return {
    props: {
      barters: barters
    }
  };
};

export default BartersHome;
