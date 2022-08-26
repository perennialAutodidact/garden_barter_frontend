import React from "react";
import AuthForm from "../../../components/Auth/AuthForm";
import Login from "../../../pages/login";
import setupElement from "../../utils/setupElement";

describe("login page", () => {

    it("renders login form", () => {
        const { 
            getByRole,
            getByLabelText,
            getByTestId,
            queryByLabelText,
            queryByTestId
        } = setupElement(<Login />)

        const heading = getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent("Log In");

        const emailLabel = getByLabelText('Email')
        expect(emailLabel).toBeInTheDocument();

        const emailInput = getByTestId('email-input')
        expect(emailInput).toBeInTheDocument()
        expect(emailInput).toHaveAttribute('type', 'email')
        expect(emailInput).toHaveValue('')

        const password1Label = getByLabelText('Password')
        expect(password1Label).toBeInTheDocument();

        const password1Input = getByTestId('password1-input')
        expect(password1Input).toBeInTheDocument()
        expect(password1Input).toHaveAttribute('type', 'password')
        expect(password1Input).toHaveValue('')


        const password2Label = queryByLabelText('Confirm Password')
        expect(password2Label).toBeNull();

        const password2Input = queryByTestId('password2-input')
        expect(password2Input).toBeNull()

    });
});