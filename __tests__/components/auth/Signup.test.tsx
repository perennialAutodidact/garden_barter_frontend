import React from "react";
import Signup from "../../../pages/signup";
import {
  render,
  RenderResult,
  authFormDataBuilder,
  waitFor
} from "../../utils";
import { AuthFormData } from "../../../ts/interfaces/auth";
import userEvent from "@testing-library/user-event";
import { NextRouter } from "next/router";
import { createMockRouter } from "../../utils/createMockRouter";
import setupElement from '../../utils/setupElement'
import { INIT_STATE_AUTHENTICATED } from "../../testData";

describe("signup page", () => {
  it("renders signup form", async () => {
    const {queryByRole, getByLabelText, getByTestId} = setupElement(<Signup/>)
    const heading = await queryByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Sign Up");

    const emailInput = getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveValue("");

    const password1Label = getByLabelText("Password");
    expect(password1Label).toBeInTheDocument();

    const password1Input = getByTestId("password1-input");
    expect(password1Input).toBeInTheDocument();
    expect(password1Input).toHaveAttribute("type", "password");
    expect(password1Input).toHaveValue("");

    const password2Label = getByLabelText("Confirm Password");
    expect(password2Label).toBeInTheDocument();

    const password2Input = getByTestId("password2-input");
    expect(password2Input).toBeInTheDocument();
    expect(password2Input).toHaveAttribute("type", "password");
    expect(password2Input).toHaveValue("");
  });

  it("renders form submit button", async () => {
    const {queryByRole, findByTestId} = setupElement(<Signup/>, INIT_STATE_AUTHENTICATED)
    const heading = await queryByRole("heading");

    const submitButton = await findByTestId("submit-button");

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Sign Up");
    expect(submitButton.tagName).toBe("BUTTON");
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("changes form data and submits form with input data", async () => {
    const {getByTestId, getByLabelText} = setupElement(<Signup/>)

    const user = userEvent.setup();
    const authFormData: AuthFormData = authFormDataBuilder("signup");

    const email: HTMLElement = getByLabelText(/email/i);
    const password: HTMLElement = getByLabelText("Password");
    const password2: HTMLElement = getByLabelText(
      "Confirm Password"
    );

    waitFor(async () => {
      await user.type(email, authFormData.email);
      expect(email).toHaveValue(authFormData.email);

      await user.type(password, authFormData.password);
      expect(password).toHaveValue(authFormData.password);

      await user.type(password2, authFormData.password2);
      expect(password2).toHaveValue(authFormData.password2);

      // mock form submit
      const signupForm = getByTestId("auth-form");
      const submitButton = getByTestId("submit-button");
      const mockSubmit = jest.fn();
      signupForm.onsubmit = mockSubmit;
      await userEvent.click(submitButton).then(() => {
        expect(signupForm.onsubmit).toHaveBeenCalled();
      });
    });
  });

  it("redirects with successful login", async () => {});
});
