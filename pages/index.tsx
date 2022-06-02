import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import BartersHome from "./barters";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import axios, { AxiosResponse } from "axios";
import { Barter, BartersHomePageProps } from "../ts/interfaces/barters";

const Index: React.FC = ({ barters }: { barters: Barter[] }) => {
  return <BartersHome barters={barters} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<BartersHomePageProps>> => {
  try {
    const res: AxiosResponse = await axios.get("/barters", {});
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

export default Index;
