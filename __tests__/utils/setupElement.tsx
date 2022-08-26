import { NextRouter } from "next/router";
import { ReactElement } from "react";
import { RootState, initialState as rootState } from "../../store/store";
import { createMockRouter } from "./createMockRouter";
import { render, RenderResult } from '../utils'

const setupElement = (
    Element: ReactElement,
    customState: Partial<RootState> = rootState,
    router: Partial<NextRouter> = createMockRouter()
): RenderResult => render(Element, {
    initialState: {
        ...rootState,
        ...customState
    }
    , router
})

export default setupElement