import { faker } from "@faker-js/faker";
import { AuthFormData } from "../ts/interfaces/auth";

import React, { FC, ReactElement } from "react";
import { queries, render, RenderOptions } from "@testing-library/react";
import { RenderResult } from "@testing-library/react/types";
// import configureStore from "redux-mock-store";
import configureStore from "redux-mock-store";
import { Provider as ReduxProvider } from "react-redux";
import { RootState } from "../store/store";
import { Store } from "redux";
import thunk from "redux-thunk";

type Props = {
  children: JSX.Element;
  store: Store;
};

interface ExtendedRenderOptions extends RenderOptions {
  initialState: Partial<RootState>;
  store?: Store<Partial<RootState>>;
  options?: Omit<RenderOptions, "queries">;
}

const AllTheProviders = (store: Store) => ({
  children
}: {
  children?: React.ReactNode;
}) =>
  <ReduxProvider store={store}>
    {children}
  </ReduxProvider>;

const customRender = (
  ui: ReactElement,
  {
    initialState,
    store = configureStore<Partial<RootState>>([thunk])(initialState),
    options
  }: ExtendedRenderOptions = {
    initialState: {}
  }
): RenderResult =>
  render(ui, {
    wrapper: AllTheProviders(store),
    ...options
  });

export * from "@testing-library/react";
export { customRender as render };

export const authFormDataBuilder = (formMode: string): AuthFormData => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  const authFormData = {
    email,
    password
  };

  if (formMode === "sign up") {
    authFormData["password2"] = password;
  }

  return authFormData;
};

