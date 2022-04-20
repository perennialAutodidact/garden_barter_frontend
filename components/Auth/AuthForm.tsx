import React, { useState } from "react";
import Link from "next/link";
interface AuthFormProps {
  formMode: string;
  formTitle: string;
}

interface FormData {
  username: string;
  password1: string;
  password2: string;
}

export const AuthForm = ({ formMode, formTitle }: AuthFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password1: "",
    password2: ""
  });

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
            >
              {/* USERNAME FIELD */}
              <div className="field-group d-flex flex-column">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
              </div>

              {/* PASSWORD 1 */}
              <div className="field-group d-flex flex-column">
                <label htmlFor="password1" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  name="password1"
                  id="password1"
                  className="form-control"
                />
              </div>

              {/* PASSWORD 2 */}
              {formMode === "sign up" &&
                <div className="field-group d-flex flex-column">
                  <label htmlFor="password2" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    name="password2"
                    id="password2"
                    className="form-control"
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
