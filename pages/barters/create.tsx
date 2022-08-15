import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import BarterCreateForm from "../../components/Barters/BarterCreateForm";
import RouteProtector from "../../common/components/RouteProtector";

const BarterCreatePage = () => {
  const { authLoadingStatus } = useAppSelector(state => state.auth);

  return (
    <RouteProtector>
      <BarterCreateForm />
    </RouteProtector>
  );
};

export default BarterCreatePage;
