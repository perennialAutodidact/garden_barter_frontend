import React, { JSXElementConstructor } from "react";
import { render, RenderResult, cleanup } from "../../utils/utils";
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
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    };
  }
}));
const useRouter = jest.spyOn(require("next/router"), "useRouter");

// jest.mock('next/dist/client/router', ()=>require('next-router-mock'))

const setupBarterCreateForm = (
  initialState: RootState,
  router: Partial<NextRouter>
) =>
  render(<BarterCreateForm />, {
    initialState: {
      ...initialState
    }
  });

describe("<BarterCreateForm/>", () => {
  beforeEach(() => {
    cleanup();
  });
  it("Should render the first form page", () => {
    const {
      getByText,
      getByTestId,
      debug
    }: RenderResult = setupBarterCreateForm(
      rootState,
      createMockRouter({ query: { step: "2" } })
    );
    // useRouter.mockImplementation(() => ({
    //     route: "/",
    //     pathname: "",
    //     query: {},
    //     asPath: "",
    //     push: jest.fn(),
    //     beforePopState: jest.fn(() => null),
    //     prefetch: jest.fn(() => null)
    // }));
    expect(getByText(/I have.../i)).toBeInTheDocument();
    expect(getByText(/1 of 5/i)).toBeInTheDocument();

    const formButton = getByTestId("BarterCreateFormButton");

    expect(formButton).toHaveTextContent(/next/i);
  });

  it("Should change form section when the 'next' button is clicked", async () => {
    const {
      getByText,
      getByTestId,
      debug
    }: RenderResult = setupBarterCreateForm(rootState, createMockRouter());

    const user = userEvent.setup();

    const formButton = getByTestId("BarterCreateFormButton");

    const mockOnClick = jest.fn().mockReturnValue({route:'/barters/create?step=2'});
    formButton.onclick = mockOnClick;
    await user.click(formButton);

    const updatedRouter = mockOnClick.mock.results[0].value;
    console.log(updatedRouter);

    expect(formButton.onclick).toHaveBeenCalled();
    //

    // expect(getByText(/general info/i)).toBeInTheDocument();
    // expect(getByText(/2 of 5/i)).toBeInTheDocument();
  });
});
