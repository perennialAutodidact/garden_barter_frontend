import { faker } from "@faker-js/faker";
import { AuthFormData } from "../../ts/interfaces/auth";

import React, { FC, ReactElement } from "react";
import { queries, render, RenderOptions } from "@testing-library/react";
import { RenderResult } from "@testing-library/react/types";
// import configureStore from "redux-mock-store";
import configureStore from "redux-mock-store";
import { Provider as ReduxProvider } from "react-redux";
import { RootState } from "../../store/store";
import { Store } from "redux";
import { NextRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context";
import thunk from "redux-thunk";

type Props = {
  children: JSX.Element;
  store: Store;
};
interface ExtendedRenderOptions extends RenderOptions {
  initialState: Partial<RootState>;
  store?: Store<Partial<RootState>>;
  options?: Omit<RenderOptions, "queries">;
  router?: Partial<NextRouter>;
}

const defaultRouter: Partial<NextRouter> = {
  route: "",
  pathname: "/",
  query: {},
  asPath: "",
  push: jest.fn(),
  basePath: "",
  isLocaleDomain: true
};

const AllTheProviders = (store: Store, router?: Partial<NextRouter>) => ({
  children
}: {
  children?: React.ReactNode;
}) =>
  <RouterContext.Provider value={{ ...defaultRouter, ...router } as NextRouter}>
    <ReduxProvider store={store}>{children}</ReduxProvider>;
  </RouterContext.Provider>;

const customRender = (
  ui: ReactElement,
  {
    initialState,
    router,
    store = configureStore<Partial<RootState>>([thunk])(initialState),
    options
  }: ExtendedRenderOptions = {
    initialState: {},
    router: defaultRouter
  }
): RenderResult =>
  render(ui, {
    wrapper: AllTheProviders(store, router),
    ...options
  });

export * from "@testing-library/react";
export { customRender as render };

export const authFormDataBuilder = (
  formMode: "signup" | "login"
): AuthFormData => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  const authFormData = {
    email,
    password
  };

  if (formMode === "signup") {
    authFormData["password2"] = password;
  }

  return authFormData;
};
