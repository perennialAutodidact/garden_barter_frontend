import React from "react";
import AuthForm from "../../../components/Auth/AuthForm";
import Signup from "../../../pages/signup";
import { render, RenderResult, authFormDataBuilder, cleanup } from "../../utils/utils";
import { AuthFormData } from "../../../ts/interfaces/auth";
import userEvent from "@testing-library/user-event";
import { Provider as ReduxProvider} from 'react-redux';
import {initialState as rootState} from '../../../store/store'
import {NextRouter} from 'next/router';
let documentBody: RenderResult;

const setupSignupPage = (initialState=rootState,  router: Partial<NextRouter>={}) => render(
    <Signup/>,
    {
        initialState: {
            ...initialState
        },
        router: { ...router }
    }
)

describe("signup page", () => {
    it("renders signup form", () => {
    documentBody = setupSignupPage()
    const heading = documentBody.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Sign Up");

    const emailInput = documentBody.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveValue("");

    const password1Label = documentBody.getByLabelText("Password");
    expect(password1Label).toBeInTheDocument();

    const password1Input = documentBody.getByTestId("password1-input");
    expect(password1Input).toBeInTheDocument();
    expect(password1Input).toHaveAttribute("type", "password");
    expect(password1Input).toHaveValue("");

    const password2Label = documentBody.getByLabelText("Confirm Password");
    expect(password2Label).toBeInTheDocument();

    const password2Input = documentBody.getByTestId("password2-input");
    expect(password2Input).toBeInTheDocument();
    expect(password2Input).toHaveAttribute("type", "password");
    expect(password2Input).toHaveValue("");
  });

  it("renders form submit button", () => {
    documentBody = setupSignupPage()

    const submitButton = documentBody.getByTestId("submit-button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Sign Up");
    expect(submitButton.tagName).toBe("BUTTON");
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("changes form data and submits form with input data", async () => {
    documentBody = setupSignupPage()

    const user = userEvent.setup();
    const authFormData: AuthFormData = authFormDataBuilder("signup");

    const email: HTMLElement = documentBody.getByLabelText(/email/i);
    await user.type(email, authFormData.email);
    expect(email).toHaveValue(authFormData.email);

    const password: HTMLElement = documentBody.getByLabelText("Password")
    await user.type(password, authFormData.password)
    expect(password).toHaveValue(authFormData.password)

    const password2: HTMLElement = documentBody.getByLabelText("Confirm Password")
    await user.type(password2, authFormData.password2)
    expect(password2).toHaveValue(authFormData.password2)   

    // mock form submit
    const signupForm = documentBody.getByTestId("auth-form");
    const submitButton = documentBody.getByTestId("submit-button");
    const mockSubmit = jest.fn();
    signupForm.onsubmit = mockSubmit;
    console.log(authFormData)
    await userEvent.click(submitButton).then(() => {
      expect(signupForm.onsubmit).toHaveBeenCalled();
    });

    
  });

  it('redirects with successful login', async ()=>{

    

  })

});
