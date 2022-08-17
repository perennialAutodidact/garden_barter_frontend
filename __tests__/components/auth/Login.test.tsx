import React from "react";
import AuthForm from "../../../components/Auth/AuthForm";
import Login from "../../../pages/login";
import {render, RenderResult, screen, fireEvent} from '../../utils/utils'
import {initialState} from '../../../store/store'

let documentBody: RenderResult;

const setupLoginPage = () => render(
    <Login/>,
    {
        initialState: {
            ...initialState
        },
        
    }
)

describe("login page", () => {

  it("renders login form", () => {
    documentBody = setupLoginPage()
    const heading = documentBody.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Log In");
    
    const emailLabel = documentBody.getByLabelText('Email')
    expect(emailLabel).toBeInTheDocument();
    
    const emailInput = documentBody.getByTestId('email-input')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveValue('')
    
    const password1Label = documentBody.getByLabelText('Password')
    expect(password1Label).toBeInTheDocument();
    
    const password1Input = documentBody.getByTestId('password1-input')
    expect(password1Input).toBeInTheDocument()
    expect(password1Input).toHaveAttribute('type', 'password')
    expect(password1Input).toHaveValue('')
    
    
    const password2Label = screen.queryByLabelText('Confirm Password')
    expect(password2Label).toBeNull();
    
    const password2Input = screen.queryByTestId('password2-input')
    expect(password2Input).toBeNull()

  });
});