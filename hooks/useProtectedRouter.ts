import { useEffect, useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { useRouter } from "next/router";

export const useProtectedRouter = () => {
  const router = useRouter();
  const { isAuthenticated, authLoadingStatus } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (router && router !== null && router !== undefined) {
      if (!isAuthenticated && authLoadingStatus === "IDLE") {
        router.push(`/login?next=${router.pathname}`);
      }
    }
  }, [isAuthenticated, authLoadingStatus]);

  return { router };
};
