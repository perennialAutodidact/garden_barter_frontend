import React from "react";
import { render, RenderResult, screen, fireEvent } from "../../utils/utils";
import { TEST_BARTER } from "../../testData";
import { initialState as rootState, RootState } from "../../../store/store";
import BartersHome from "../../../pages/barters";
import BarterItem from "../../../components/Barters/BarterItem";
import { getAllByTitle, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let documentBody: RenderResult;

const setupBarterItem = barter => render(<BarterItem barter={barter} />);

describe("<BarterItem/>", () => {
  it("Should render item data", () => {
    const user = userEvent.setup();

    const { getByText, getByTestId, queryAllByTitle } = setupBarterItem(TEST_BARTER);

    expect(getByText(TEST_BARTER.title)).toBeInTheDocument();

    expect(getByTestId("BarterDescription")).toBeInTheDocument();

    expect(getByTestId("WillTradeFor")).toBeInTheDocument();


  });
});
