import React from "react";
import { render, RenderResult, screen, fireEvent } from "../../utils";
import { TEST_BARTER } from "../../testData";
import BarterItem from "../../../components/Barters/BarterItem";
import userEvent from "@testing-library/user-event";
import setupElement from '../../utils/setupElement'

describe("<BarterItem/>", () => {
  it("Should render item data", () => {
    const user = userEvent.setup();
    
    const { getByText, getByTestId, queryAllByTitle } = setupElement(<BarterItem barter={TEST_BARTER}/>);

    expect(getByText(TEST_BARTER.title)).toBeInTheDocument();

    expect(getByTestId("BarterDescription")).toBeInTheDocument();

    expect(getByTestId("WillTradeFor")).toBeInTheDocument();


  });
});
