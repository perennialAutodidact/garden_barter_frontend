import React, { ReactNode } from "react";
import { render, RenderResult, cleanup, waitFor } from "../../utils/utils";
import BarterCreateForm from "../../../components/Barters/BarterCreateForm";
import { initialState as rootState, RootState } from "../../../store/store";
// import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import { NextRouter } from "next/router";
import { createMockRouter } from "../../utils/createMockRouter";
import BarterCreatePage from "../../../pages/barters/create";

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
  el: ReactNode,
  initialState: RootState,
  router: Partial<NextRouter>
) =>
  render(<BarterCreateForm />, {
    initialState: {
      ...initialState,
    },
    router,
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
    }: RenderResult = setupBarterCreateForm(
      <BarterCreatePage />,
      rootState,
      createMockRouter()
    );

    // expect to be on page 1
    expect(getByText(/I have.../i)).toBeInTheDocument();
    expect(getByText(/1 of 5/i)).toBeInTheDocument();

    expect(getByText(/next/i)).toBeInTheDocument();

    // the back button will not exist on the first step of the form
    expect(queryByText(/back/i)).toBeNull();
  });

  it("should change from section 1 to section 2 when valid", async () => {
    let {
      getByText,
      getByTestId,
      findByText,
      findByTestId,
      getByLabelText,
      rerender,
      debug,
    }: RenderResult = setupBarterCreateForm(
      <BarterCreatePage />,
      rootState,
      createMockRouter()
    );

    const user = userEvent.setup();
    const formButton = getByText(/next/i);
    const validationFunction = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockResolvedValueOnce(true);
    formButton.onclick = jest
      .fn()
      .mockImplementation(() => validationFunction());

    waitFor(async () => {
      // click the 'seed' radio button to select it
      expect(getByTestId("BarterTypeRadio-seed")).not.toBeChecked();
      await user.click(formButton);

      expect(validationFunction).toHaveReturnedWith(false);
      
      // click the 'seed' radio button to select it
      await user.click(getByTestId("BarterTypeRadio-seed"));
      expect(getByTestId("BarterTypeRadio-seed")).toBeChecked();
      
      // click the 'next' button
      await user.click(formButton);
      expect(formButton.onclick).toHaveBeenCalled();
      expect(validationFunction).toHaveReturnedWith(false);

      // expect that the form step changes from 1 to 2
      expect(await findByText(/general info/i)).toBeInTheDocument();
      expect(await findByText(/2 of 5/i)).toBeInTheDocument();

      debug(await findByText(/general info/i));
      // click the 'back' button and expect the step to change from 2 to 1
      await user.click(getByText(/back/i));
      expect(await findByText(/i have.../i)).toBeInTheDocument();
      expect(await findByText(/1 of 5/i)).toBeInTheDocument();
    });
  });

  it("should submit form data from last section", async () => {
    let { getByText, findByText, debug }: RenderResult = setupBarterCreateForm(
      <BarterCreateForm />,
      { ...rootState },
      createMockRouter()
    );

    const user = userEvent.setup();
    const formButton = getByText(/next/i);
    const validationFunction = jest
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
    formButton.onclick = jest
      .fn()
      .mockImplementation(() => validationFunction());

      const stepNumber = getByText(/\d{1} of \d{1}/i)
      await user.click(formButton)
      await user.click(formButton)
      await user.click(formButton)
      await user.click(formButton)
      debug(stepNumber)

    expect(validationFunction).toHaveBeenCalledTimes(4)


  });
});
