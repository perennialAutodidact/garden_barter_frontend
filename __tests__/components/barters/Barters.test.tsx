import React from "react";
import { TEST_BARTERS } from "../../testData";
import { initialState as rootState, RootState } from "../../../store/store";
import BartersHome from "../../../pages/barters";
import setupElement from '../../utils/setupElement'

describe("barters list page", () => {
    it("renders all barters", async () => {
        const initState: Partial<RootState> = {
            barters: {
                ...rootState.barters,
                barters: TEST_BARTERS,
                barterLoadingStatus: 'IDLE'
            }
        };
        const { findAllByTestId } = setupElement(<BartersHome barters={TEST_BARTERS} />, initState)
        expect(await findAllByTestId("BarterItem")).toHaveLength(TEST_BARTERS.length)
    });
});
