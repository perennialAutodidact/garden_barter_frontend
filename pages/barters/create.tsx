import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRouter } from "next/router";
import BarterCreateForm from "../../components/Barters/BarterCreateForm";

const BarterCreatePage = () => {
  const router = useRouter();
  const { isAuthenticated, authLoadingStatus } = useAppSelector(
    state => state.auth
  );

  useEffect(
    () => {
      if (!isAuthenticated) {
        router.push("/login?next=/barters/create/");
      }
    },
    [isAuthenticated, authLoadingStatus]
  );

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
