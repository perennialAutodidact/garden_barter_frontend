import Navbar from "../../../common/components/Layout/Navbar/Navbar";
import { findByTestId, render, RenderResult, waitFor } from "../../utils";
import userEvent from "@testing-library/user-event";
import { RootState, initialState as rootState } from "../../../store/store";
import {
    TEST_USER,
    INIT_STATE_NOT_AUTHENTICATED,
    INIT_STATE_AUTHENTICATED,
} from "../../testData";
import { NextRouter } from "next/router";
import { createMockRouter } from "../../utils/createMockRouter";
import setupElement from "../../utils/setupElement"

// const setupElement = (
//     initialState: RootState = rootState,
//     router: Partial<NextRouter>
// ) =>
//     render(
//         <Navbar />, {
//         initialState,
//         router,
//     });

// jest.mock("next/router", () => ({
//     useRouter() {
//         return {
//             route: "/",
//             pathname: "",
//             query: {},
//             asPath: "",
//             push: jest.fn(),
//             events: {
//                 on: jest.fn(),
//                 off: jest.fn(),
//             },
//             beforePopState: jest.fn(() => null),
//             prefetch: jest.fn(() => null),
//         };
//     },
// }));
// const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("<Navbar/>", () => {
    it("should render without crashing", () => {
        setupElement(<Navbar/>, rootState, createMockRouter());
    });

    it("should render unauthenticated navbar", async () => {
        const { getByRole, findByText } = setupElement(
            <Navbar/>,
            INIT_STATE_NOT_AUTHENTICATED,
            createMockRouter()
        );

        expect(getByRole("GBLogo")).toBeInTheDocument();
        expect(getByRole("NavbarHeader")).toBeInTheDocument();

        expect(await findByText(/sign up/i)).toBeInTheDocument();
        expect(await findByText(/log in/i)).toBeInTheDocument();
    });

    it("should render authenticated navbar", async () => {
        const user = userEvent.setup({ delay: null });

        const {
            getByRole,
            findByRole,
            findByText,
        } = setupElement(<Navbar/>,INIT_STATE_AUTHENTICATED, createMockRouter());

        expect(getByRole("NavbarHeader")).toBeInTheDocument();
        expect(getByRole("GBLogo")).toBeInTheDocument();

        const createBarterButton = await findByRole("CreateBarterButton")
        expect(createBarterButton).toBeInTheDocument()

        const accountDropdown = await findByRole("AccountDropdown");
        expect(accountDropdown).toBeInTheDocument();

    });

    it("should navigate to user's account page", async () => { 

        const user = userEvent.setup({ delay: null });

        const {
            findByRole,
            findByText,
        } = setupElement(<Navbar/>, INIT_STATE_AUTHENTICATED, createMockRouter());
        
        const accountDropdown = await findByRole("AccountDropdown");
        await user.click(accountDropdown)
        expect(await findByRole("AccountDropdownMenu")).toBeInTheDocument();
        
        const usernameButton = await findByText(TEST_USER.username)
        expect(usernameButton).toBeInTheDocument()
        usernameButton.onclick = jest.fn()
        await user.click(usernameButton)

        // expect user account page to be shown

        // const logoutButton = await findByText('Log Out')
        // expect(logoutButton).toBeInTheDocument()
        // logoutButton.onclick = jest.fn()
        
        // const createBarterButton = await findByText('Create Barter')
        // expect(createBarterButton).toBeInTheDocument()
        // createBarterButton.onclick = jest.fn()

    });

    it("should navigate to barter create form page", async () => { 

        const user = userEvent.setup({ delay: null });

        const {
            findByRole,
            findByTestId
        } = setupElement(<Navbar/>, INIT_STATE_AUTHENTICATED, createMockRouter());
        
        const accountDropdown = await findByRole("AccountDropdown");
        await user.click(accountDropdown)
        expect(await findByRole("AccountDropdownMenu")).toBeInTheDocument();
        // const logoutButton = await findByText('Log Out')
        // expect(logoutButton).toBeInTheDocument()
        // logoutButton.onclick = jest.fn()
        
        // const createBarterButton = await findByTestId('CreateBarterDropdownLink')
        // expect(createBarterButton).toBeInTheDocument()
        // createBarterButton.onclick = jest.fn()
        // await user.click(createBarterButton)



        // expect(await findByTestId('BarterCreatePage')).toBeInTheDocument()
    });
});