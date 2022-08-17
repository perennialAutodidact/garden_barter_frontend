import React from "react";
import { render, RenderResult } from "../../utils/utils";
import { TEST_BARTERS } from "../../testData";
import { initialState as rootState, RootState } from "../../../store/store";
import BartersHome from "../../../pages/barters";
import {waitFor} from "@testing-library/react";
let documentBody: RenderResult;

const setupBartersPage = (initialState:RootState = rootState) =>
  render(<BartersHome barters={initialState.barters.barters} />, {
    initialState: {
      ...initialState
    }
  });

describe("barters list page", () => {
  it("renders all barters", async () => {
    const initState: RootState = {
      ...rootState,
      barters: {
        ...rootState.barters,
        barters: TEST_BARTERS
      }
    };
    documentBody = setupBartersPage(initState);

    await waitFor(() => expect(documentBody.findAllByTestId("BarterItem")));
  });
});
