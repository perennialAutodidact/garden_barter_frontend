import Navbar from "../../../common/components/Layout/Navbar/Navbar";
import { render, RenderResult, waitFor } from "../../utils/utils";
import userEvent from "@testing-library/user-event";
import { RootState, initialState as rootState } from "../../../store/store";
import {
  TEST_USER,
  INIT_STATE_NOT_AUTHENTICATED,
  INIT_STATE_AUTHENTICATED,
} from "../../testData";
import { NextRouter } from "next/router";
import { createMockRouter } from "../../utils/createMockRouter";

const setupNavbar = (
  initialState: RootState = rootState,
  router: Partial<NextRouter>
) =>
  render(<Navbar />, {
    initialState,
    router,
  });

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

describe("<Navbar/>", () => {
  it("should render without crashing", () => {
    setupNavbar(rootState, createMockRouter());
  });

  it("should render unauthenticated navbar", async () => {
    const { getByRole, findByText } = setupNavbar(
      INIT_STATE_NOT_AUTHENTICATED,
      createMockRouter()
    );

    expect(getByRole("GBLogo")).toBeInTheDocument();
    expect(getByRole("NavbarHeader")).toBeInTheDocument();

    expect(await findByText(/sign up/i)).toBeInTheDocument();
    expect(await findByText(/log in/i)).toBeInTheDocument();
  });

  it("should render authenticated navbar", async () => {
    const user = userEvent.setup();

    const {
      getByRole,
      findByRole,
      queryByRole,
      findByText,
      debug,
    } = setupNavbar(INIT_STATE_AUTHENTICATED, createMockRouter());
    const accountDropdown = await findByRole("AccountDropdown");
    expect(getByRole("GBLogo")).toBeInTheDocument();
    expect(getByRole("NavbarHeader")).toBeInTheDocument();
    accountDropdown.onclick = jest.fn();
    debug(accountDropdown)
    // expect(accountDropdown).toBeInTheDocument();
    // await user.click(accountDropdown);
    // waitFor(async()=>{

      // expect(await findByRole("AccountDropdownMenu")).toBeInTheDocument();
      // expect(await findByRole("CreateBarterButton")).toBeInTheDocument();
      // expect(await findByText(TEST_USER.username)).toBeInTheDocument();
    // })
  });

  it("should render all account dropdown buttons and they should navigate to the correct pages", () => {});
});
