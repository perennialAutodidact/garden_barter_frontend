import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AuthFormProps, AuthFormData } from "../../ts/interfaces/auth";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { signup, login } from "../../store/authSlice/actions";
import { createMessage, deleteMessage} from "../../store/messageSlice";
import Router from "next/router";
import { unwrapResult } from "@reduxjs/toolkit";
export const AuthForm = ({ formMode, formTitle }: AuthFormProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { messages } = useAppSelector(state => state.messages);

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    password2: ""
  });

  const { email, password, password2 } = formData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (formMode === "sign up") {
      dispatch(signup(formData))
        .then(res => {
          Router.push("/");
        })
        .catch(err => {
          err.msg.forEach(message => {
            dispatch(
              createMessage({
                id: messages.length,
                text: message,
                level: "danger"
              })
            );
          });
        });
    } else {
      dispatch(login(formData))
        .then(unwrapResult)
        .then(res => console.log("res", res))
        .catch(errorMessages => {
          errorMessages.forEach(message => {
            dispatch(
              createMessage({
                id: messages.length,
                text: message,
                level: "danger"
              })
            );
          });
        });
    }
  };

  useEffect(
    () => {
      if (isAuthenticated) {
        Router.push("/");
      }
    },
    [isAuthenticated]
  );

  return (
    <div className="row py-5">
      <div className="col-10 offset-1 col-lg-4 offset-lg-4">
        <h1 className="text-light-light mb-3 display-2">
          {formTitle}
        </h1>

        <div className="row bg-light rounded shadow">
          <div className="col-12 border border-bottom-1 rounded">
            <form
              action=""
              method="POST"
              className="p-3 d-flex flex-column gap-3"
              onSubmit={handleSubmit}
            >
              {/* EMAIL FIELD */}
              <div className="field-group d-flex flex-column">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                />
              </div>

              {/* PASSWORD 1 */}
              <div className="field-group d-flex flex-column">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              {/* PASSWORD 2 */}
              {formMode === "sign up" &&
                <div className="field-group d-flex flex-column">
                  <label htmlFor="password2" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    className="form-control"
                    value={password2}
                    onChange={handleChange}
                  />
                </div>}

              <button className="btn btn-warning-dark my-3 text-dark fw-bold shadow">
                {formTitle}
              </button>
            </form>
          </div>

          <div className="bg-light-dark col-12 p-3 text-center rounded-bottom">
            {formMode === "sign up"
              ? <div>
                  Have an account?{" "}
                  <Link href="/login">
                    <a className="link-secondary fw-bold text-decoration-none">
                      Log In
                    </a>
                  </Link>
                </div>
              : <div>
                  Need an account?{" "}
                  <Link href="/signup">
                    <a className="link-secondary fw-bold text-decoration-none">
                      Sign Up
                    </a>
                  </Link>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default AuthForm;
