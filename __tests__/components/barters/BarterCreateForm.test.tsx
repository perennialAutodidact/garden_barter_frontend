import React, { ReactNode } from "react";
import "@testing-library/react/dont-cleanup-after-each";
import {
  render,
  RenderResult,
  cleanup,
  waitFor,
  screen,
  findAllByTestId,
  getByLabelText,
  queryByTestId,
  findByTestId
} from "../../utils/utils";
import BarterCreateForm from "../../../components/Barters/BarterCreateForm";
import { initialState as rootState, RootState } from "../../../store/store";
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
  afterAll(() => {
    cleanup();
  });
  it("should validate step 1 before moving to step 2", async () => {
    setupBarterCreateForm(<BarterCreatePage />, rootState, createMockRouter());
    const { getByTestId, getByText, queryByText, findAllByTestId } = screen;
    const user = userEvent.setup();
    const nextButton = getByText(/next/i);
    nextButton.onclick = jest.fn();

    // STEP 1 - I HAVE...

    expect(getByText(/1 of 6/i)).toBeInTheDocument();

    // the back button will not exist on the first step of the form
    expect(queryByText(/back/i)).not.toBeInTheDocument();

    // radio is unchecked by default, rendering validation errors when next button is clicked
    expect(getByTestId("BarterTypeRadio-seed")).not.toBeChecked();
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(1);
    expect(
      (await findAllByTestId("BarterFormError-barterType")).length
    ).toBeGreaterThan(0);

    // click the 'seed' radio button to select it
    await user.click(getByTestId("BarterTypeRadio-seed"));
    expect(getByTestId("BarterTypeRadio-seed")).toBeChecked();

    // click the 'next' button
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(2);
  });

  it("should validate title and description before moving to step 3", async () => {
    // STEP 2 - GENERAL INFO
    //
    const {
      getByLabelText,
      getByText,
      findAllByTestId,
      queryAllByTestId
    } = screen;

    const user = userEvent.setup();
    const nextButton = getByText(/next/i);
    nextButton.onclick = jest.fn();

    // expect that the form step changes from 1 to 2
    expect(getByText(/general info/i)).toBeInTheDocument();
    expect(getByText(/2 of 6/i)).toBeInTheDocument();

    // fail to move to next step because title and description are blank
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(1);
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

    await user.click(nextButton); // to step 3
    expect(nextButton.onclick).toHaveBeenCalledTimes(2);
  });

  it(`should render step 3 with a 'back' link and
       'next' button with step number label`, async () => {
    // STEP 3 - ADDITIONAL INFO
    // step 3 has no required fields, thus no validation logic
    const { getByText } = screen;

    const user = userEvent.setup();
    const nextButton = getByText(/next/i);
    nextButton.onclick = jest.fn();
    const backButton = getByText(/back/i);
    backButton.onclick = jest.fn();

    expect(getByText(/3 of 6/i)).toBeInTheDocument();

    // back button should go back to step 2
    expect(backButton).toBeInTheDocument();
    await user.click(backButton);
    expect(getByText(/2 of 6/i)).toBeInTheDocument();
    expect(backButton.onclick).toHaveBeenCalledTimes(1);

    // progress to step 3 again
    expect(nextButton).toBeInTheDocument();
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(1);

    // to step 4...
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(2);
  });

  it(`should validate willTradeFor and isFree 
      before moving to step 5`, async () => {
    // STEP 4 - WILL TRADE FOR

    const {
      getByLabelText,
      getByText,
      findAllByTestId,
      queryAllByTestId
    } = screen;

    const user = userEvent.setup();
    const nextButton = getByText(/next/i);
    nextButton.onclick = jest.fn();
    const backButton = getByText(/back/i);
    backButton.onclick = jest.fn();

    expect(getByText(/4 of 6/i)).toBeInTheDocument();

    // fail to progress to step 5
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(1);
    expect(
      (await findAllByTestId("BarterFormError-willTradeFor")).length
    ).toBeGreaterThan(0);

    // check the isFree checkbox to mitigate the error
    let isFreeCheckbox = getByLabelText(/free/i);
    expect(isFreeCheckbox).not.toBeChecked();
    await user.click(isFreeCheckbox);
    await waitFor(async () => {
      expect(queryAllByTestId("BarterFormError-willTradeFor")).toHaveLength(0);
    });
    expect(isFreeCheckbox).toBeChecked();

    // click nextButton to go to page 5
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      expect(getByText(/5 of 6/i)).toBeInTheDocument();
    });

    // go back to step 4
    await user.click(backButton);
    expect(backButton.onclick).toHaveBeenCalledTimes(1);

    isFreeCheckbox = getByLabelText(/free/i);
    // uncheck isFree checkbox
    await user.click(isFreeCheckbox);
    await waitFor(async () => {
      expect(queryAllByTestId("BarterFormError-willTradeFor")).toHaveLength(0);
      expect(isFreeCheckbox).not.toBeChecked();
    });

    // fail to progress to step 5
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(3);

    await waitFor(async () => {
      expect(
        queryAllByTestId("BarterFormError-willTradeFor").length
      ).toBeGreaterThan(0);
    });

    // change value of willTradeFor field to remove error message
    const willTradeForField = getByLabelText(/will trade for/i);
    await user.type(willTradeForField, "test will trade for");
    await waitFor(async () => {
      expect(queryAllByTestId("BarterFormError-willTradeFor")).toHaveLength(0);
    });
    expect(willTradeForField).toHaveValue("test will trade for");

    // fail to progress to step 5 if isFree is checked and willTradeFor is not blank
    await user.click(isFreeCheckbox);
    await user.click(nextButton);

    await waitFor(async () => {
      expect(
        queryAllByTestId("BarterFormError-willTradeFor").length
      ).toBeGreaterThan(0);
      expect(isFreeCheckbox).toBeChecked();
    });
    expect(nextButton.onclick).toHaveBeenCalledTimes(4);

    // uncheck isFree
    await user.click(isFreeCheckbox);
    expect(isFreeCheckbox).not.toBeChecked();

    // progress to step 5
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(5);
  });

  it("should validate section 5 before moving on to section 6", async () => {
    const { getByText, getByLabelText, queryAllByTestId, findByTestId  } = screen;
    const user = userEvent.setup();
    const backButton = getByText(/back/i);
    backButton.onclick = jest.fn();

    expect(getByText(/5 of 6/i)).toBeInTheDocument();

    await user.click(backButton);
    expect(backButton.onclick).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(getByText(/4 of 6/i)).toBeInTheDocument();
    });

    // back to step 5
    const nextButton = getByText(/next/i);
    nextButton.onclick = jest.fn();
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(1);
    await waitFor(async () => {
      expect(getByText(/5 of 6/i)).toBeInTheDocument();
    });

    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(2)
    await waitFor(async () => {
      expect(
        queryAllByTestId("BarterFormError-postalCode").length
        ).toBeGreaterThan(0);
    });
    
    const postalCodeInput = getByLabelText(/postal code/i)
    await user.type(postalCodeInput, '97233')
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(3)
    await waitFor(async () => {
      expect(
        queryAllByTestId("BarterFormError-postalCode")
      ).toHaveLength(0)
    });

    await waitFor(() => {
        expect(getByText(/6 of 6/i)).toBeInTheDocument();
      });
  });

  it("Should submit form data and redirect to barter list", async ()=>{

    const {getByText} = screen;

    const user = userEvent.setup();
    const backButton = getByText(/back/i);
    backButton.onclick = jest.fn();

    expect(getByText(/6 of 6/i)).toBeInTheDocument();

    await user.click(backButton);
    expect(backButton.onclick).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(getByText(/5 of 6/i)).toBeInTheDocument();
    });

    // back to step 5
    const nextButton = getByText(/next/i);
    nextButton.onclick = jest.fn();
    await user.click(nextButton);
    expect(nextButton.onclick).toHaveBeenCalledTimes(1);
    await waitFor(async () => {
      expect(getByText(/6 of 6/i)).toBeInTheDocument();
    });

    const submitButton = getByText(/submit/i)
    submitButton.onclick = jest.fn()
    expect(submitButton).toBeInTheDocument()
    await user.click(submitButton)
    expect(submitButton.onclick).toHaveBeenCalledTimes(1)

    
  })
});
