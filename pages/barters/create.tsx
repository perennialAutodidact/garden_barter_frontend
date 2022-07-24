import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useProtectedRouter } from "../../hooks/useProtectedRouter";
import BarterCreateForm from "../../components/Barters/BarterCreateForm";

const BarterCreatePage = () => {
  const { router } = useProtectedRouter();
  const { authLoadingStatus } = useAppSelector(state => state.auth);

  return (
    <div>
      {authLoadingStatus === "PENDING"
        ? <div className="d-flex justify-content-center align-items-center vh-75">
            <div
              className="spinner-border text-success text-center mt-5"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        : <BarterCreateForm />}
    </div>
  );
};

export default BarterCreatePage;
