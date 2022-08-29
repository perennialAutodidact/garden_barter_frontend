import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import BarterCreateForm from "../../components/Barters/BarterCreateForm";
import RouteProtector from "../../common/components/RouteProtector";
import Layout from "../../common/components/Layout";
const BarterCreatePage = () => {
    const { authLoadingStatus } = useAppSelector(state => state.auth);

    return (
        <Layout title={"Create Barter"}>
            <BarterCreateForm />
        </Layout>
    );
};

export default BarterCreatePage;
