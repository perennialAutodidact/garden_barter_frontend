import React from "react";
import { render, screen } from "@testing-library/react";
import Signup from "../../../pages/signup";
import Login from "../../../pages/login";

describe("signup page", () => {
  it("loads and displays signup form", () => {
    const {getByRole} = render(<Signup></Signup>)

    expect(getByRole('heading')).toBeInTheDocument()
  })
});
