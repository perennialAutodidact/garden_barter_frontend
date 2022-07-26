import { useEffect, useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { NextRouter, useRouter } from "next/router";

export const useProtectedRouter = () => {
  const router:NextRouter = useRouter();
  const { isAuthenticated, authLoadingStatus } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (router && router !== null && router !== undefined) {
      if (!isAuthenticated && authLoadingStatus === "IDLE") {

        // const query = {next:router.asPath}
        const query = {next:router.asPath}

        router.push({
          pathname: '/login',
          query,
        });
      }
    }
  }, [isAuthenticated, authLoadingStatus]);

  return { router };
};
