import React, { useEffect } from "react";
import BartersHome from "./barters";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import axios, { AxiosResponse } from "axios";
import { BartersHomePageProps } from "../ts/interfaces/barters";
import { API_URL } from "../common/constants";

const Index: React.FC = ({ barters }: BartersHomePageProps) => {
  return <BartersHome barters={barters} />;
};

export const getServerSideProps = async () => {

  try {
    const response = await axios.get(`${API_URL}/barters/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    if (!response) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        barters: response.data.barters
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export default Index;
