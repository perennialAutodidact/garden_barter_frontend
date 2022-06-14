import React, { JSXElementConstructor } from "react";
import { render, RenderResult, cleanup, waitFor } from "../../utils/utils";
import BarterCreateForm from "../../../components/Barters/BarterCreateForm";
import { initialState as rootState, RootState } from "../../../store/store";
// import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import * as nextRouter from "next/router";
import { NextRouter } from "next/router";
import { createMockRouter } from "../../utils/createMockRouter";

let documentBody: RenderResult;
// let useRouter: jest.Mock<nextRouter.NextRouter>;

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));
const useRouter = jest.spyOn(require("next/router"), "useRouter");

// jest.mock('next/dist/client/router', ()=>require('next-router-mock'))

const setupBarterCreateForm = (
  initialState: RootState,
  router: Partial<NextRouter>
) =>
  render(<BarterCreateForm />, {
    initialState: {
      ...initialState,
    },
  });

describe("<BarterCreateForm/>", () => {
  beforeEach(() => {
    cleanup();
  });
  it("Should render the first form page", () => {
    const {
      getByText,
      queryByText,
      getByTestId,
      debug,
    }: RenderResult = setupBarterCreateForm(rootState, createMockRouter());

    // expect to be on page 1
    expect(getByText(/I have.../i)).toBeInTheDocument();
    expect(getByText(/1 of 5/i)).toBeInTheDocument();

    expect(getByText(/next/i)).toBeInTheDocument();

    // the back button will not exist on the first step of the form
    expect(queryByText(/back/i)).toBeNull();
  });

  it("Should change form section when the 'next' button is clicked and when the 'back' button is clicked", async () => {
    let {
      getByText,
      getByTestId,
      findByText,
      getByLabelText,
      rerender,
      debug,
    }: RenderResult = setupBarterCreateForm(rootState, createMockRouter());

    const user = userEvent.setup();
    
    // click the 'seed' radio button to select it
    await user.click(getByTestId("BarterTypeRadio-seed"));
    expect(getByTestId("BarterTypeRadio-seed")).toBeChecked();
    
    // click the 'next' button
    const formButton = getByText(/next/i);
    formButton.onclick = jest.fn();
    await user.click(formButton);
    expect(formButton.onclick).toHaveBeenCalled();
    
    // expect that the form step changes from 1 to 2
    await waitFor(async () => {
      expect(await findByText(/general info/i)).toBeInTheDocument();
      expect(await findByText(/2 of 5/i)).toBeInTheDocument();
    });
    
    // click the 'back' button and expect the step to change from 2 to 1
    await user.click(getByText(/back/i));
    await waitFor(async () => {
      expect(await findByText(/i have.../i)).toBeInTheDocument();
      expect(await findByText(/1 of 5/i)).toBeInTheDocument();
    });
  });
  
  it('expect error alert if required field is blank', async ()=>{
    
    let {
      getByText,
      getByTestId,
      findByText,
      getByLabelText,
      rerender,
      debug,
    }: RenderResult = setupBarterCreateForm(rootState, createMockRouter());
    
    const user = userEvent.setup();

    // click the 'next' button
    await user.click(getByText(/next/i))

    // expect an alert to be raised
  })
  
});
