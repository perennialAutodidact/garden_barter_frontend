import React from "react";
import { BartersHomePageProps } from "../../ts/interfaces/barters";
import BarterList from "../../components/Barters/BarterList";
import Layout from "../../common/components/Layout";

const BartersHome = ({ barters }: BartersHomePageProps) => {
    return (
        <Layout title={"Garden Barter"}>
            <main className="container-fluid">
                <BarterList barters={barters} />
            </main>
        </Layout>
    );
};


export default BartersHome;
