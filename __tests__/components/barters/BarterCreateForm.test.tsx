import React, { ReactNode } from "react";
import {
  render,
  RenderResult,
  cleanup,
  waitFor,
  findAllByTestId,
  getByLabelText,
  queryByTestId
} from "../../utils/utils";
import BarterCreateForm from "../../../components/Barters/BarterCreateForm";
import { initialState as rootState, RootState } from "../../../store/store";
import userEvent from "@testing-library/user-event";
import { NextRouter } from "next/router";
import { createMockRouter } from "../../utils/createMockRouter";
import BarterCreatePage from "../../../pages/barters/create";
import {screen}from'../../utils/utils'

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
  el: ReactNode,
  initialState: RootState,
  router: Partial<NextRouter>
) =>
  render(<BarterCreateForm />, {
    initialState: {
      ...initialState
    },
    router
  });

describe("<BarterCreateForm/>", () => {
    beforeAll(()=>{
    })
  beforeEach(() => {
    cleanup();
  });
  it("Should render the first form page", () => {
    const {
      getByText,
      queryByText,
      getByTestId,
      debug
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
    expect(queryByText(/back/i)).not.toBeInTheDocument();
  });

  it("E2E form interaction", async () => {
    let {
      getByText,
      getByLabelText,
      getByTestId,
      findByText,
      findAllByTestId,
      queryAllByTestId,
      debug
    }: RenderResult = setupBarterCreateForm(
      <BarterCreatePage />,
      rootState,
      createMockRouter()
    );

    const user = userEvent.setup();
    const formButton = getByText(/next/i);
    formButton.onclick = jest.fn();

    // STEP 1 - I HAVE...
    expect(getByTestId("BarterTypeRadio-seed")).not.toBeChecked();
    await user.click(formButton);
    // click the 'seed' radio button to select it
    expect(
      (await findAllByTestId("BarterFormError-barterType")).length
    ).toBeGreaterThan(0);

    // click the 'seed' radio button to select it
    await user.click(getByTestId("BarterTypeRadio-seed"));
    expect(getByTestId("BarterTypeRadio-seed")).toBeChecked();
    // click the 'next' button
    await user.click(formButton);
    expect(formButton.onclick).toHaveBeenCalled();

    // expect that the form step changes from 1 to 2
    expect(await findByText(/general info/i)).toBeInTheDocument();
    expect(await findByText(/2 of 5/i)).toBeInTheDocument();

    // click the 'back' button and expect the step to change from 2 to 1
    await user.click(getByText(/back/i));
    expect(await findByText(/i have.../i)).toBeInTheDocument();
    expect(await findByText(/1 of 5/i)).toBeInTheDocument();

    await user.click(formButton); // to step 2

    // STEP 2 - GENERAL INFO
    //
    
    // fail to move to next step because title and description are blank
    await user.click(formButton); 
    expect(
      (await findAllByTestId("BarterFormError-title")).length
    ).toBeGreaterThan(0);
    expect(
      (await findAllByTestId("BarterFormError-description")).length
    ).toBeGreaterThan(0);

    // change titleField value to make title error disappear
    const titleField = getByLabelText(/title/i);
    await user.type(titleField, "test title");
    await waitFor(async () => {
        expect(queryAllByTestId("BarterFormError-title")).toHaveLength(0);
    });
    expect(titleField).toHaveValue("test title");
    
    // change descriptionField value to make title error disappear
    const descriptionField = getByLabelText(/description/i);
    await user.type(descriptionField, "test description");
    await waitFor(() => {
      expect(queryAllByTestId("BarterFormError-description")).toHaveLength(0);
    });
    expect(descriptionField).toHaveValue("test description");


    await user.click(formButton); // to step 3

    expect()
  });
  // expect(validationFunction).toHaveBeenCalledTimes(4)
});
