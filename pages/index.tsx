import React, { useEffect } from "react";
import BartersHome from "./barters";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import axios, { AxiosResponse } from "axios";
import { BartersHomePageProps } from "../ts/interfaces/barters";
import { API_URL } from "../common/constants";
import { useCookie } from "next-cookie";
const Index: React.FC = ({ barters }: BartersHomePageProps) => {
  return <BartersHome barters={barters} />;
};

export const getServerSideProps = async (context) => {
    const cookie = useCookie(context)
    console.log(cookie)
  try {
    const response = await axios.get(`${API_URL}/barters/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    return {
      props: {
        barters: response.data.barters
      }
    };
  } catch (error) {
    // console.log(error);

      return {
        notFound: true
    }
  }
};

export default Index;
