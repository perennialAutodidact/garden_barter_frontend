import React, { Fragment, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import { useAppSelector } from "../../store/hooks";
import Spinner from "../../common/components/Spinner";

interface RouteProtectorProps {
  children: React.ReactNode;
}

const RouteProtector = ({ children }: RouteProtectorProps) => {
  const {
    isAuthenticated,
    authLoadingStatus,
    updateTokenSuccess,
  } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (router && router !== null && router !== undefined) {
      if (
        !isAuthenticated &&
        authLoadingStatus === "IDLE" 
      ) {
        const query = { next: router.asPath };

        router.push({
          pathname: "/login",
          query,
        });
      }
    }
  }, [isAuthenticated, authLoadingStatus]);

  if (!isAuthenticated && authLoadingStatus === "IDLE") {
    return (
      <div className="d-flex justify-content-center align-items-center min-75-vh">
        <Spinner />
      </div>
    );
  }

  return <Fragment>{children}</Fragment>;
};

export default RouteProtector;
