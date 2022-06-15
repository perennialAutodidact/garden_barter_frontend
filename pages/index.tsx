import React, {useEffect} from "react";
import BartersHome from "./barters";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import axios, { AxiosResponse } from "axios";
import { Barter, BartersHomePageProps } from "../ts/interfaces/barters";

const Index: React.FC = ({ barters }: { barters: Barter[] }) => {
  return <BartersHome barters={barters} />;
};


export default Index;
