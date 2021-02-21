import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import useAuthForm from "../hooks/useAuthForm";
import useTokenCheckInAuth from "../hooks/useTokenCheckInAuth";

import AuthFormPanel from "../components/AuthFormPanel/AuthFormPanel";
import Loading from "../components/Loading/Loading";
import ErrorPanel from "../components/Errors/ErrorPanel";

export default function signUp() {
  const { isLoading } = useTokenCheckInAuth();
  const {
    formData,
    ErrorMessage,
    formHandler,
    guestUser,
    signUpHandler,
  } = useAuthForm({
    email: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!isLoading)
    return (
      <div className="auth-page">
        <Head>
          <title>Yummy Menu</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ErrorPanel text={ErrorMessage} type="fail" />
        <AuthFormPanel
          type="sign up"
          redirectLink={{
            description: "already have an account,",
            buttonTitle: "sign in",
            to: "/sign-in",
          }}
          guestUser={guestUser}
          formData={formData}
          submitHandler={signUpHandler}
          ErrorMessage={ErrorMessage}
        >
          <div className="input-container">
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={(e) => formHandler(e)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={(e) => formHandler(e)}
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={(e) => formHandler(e)}
            />
            <div
              className="input-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <div className="p-relative">
                <img
                  src={`/design-utils/show-password.png`}
                  alt="show password"
                />
                {showPassword && <div className="hide-password"></div>}
              </div>
            </div>
          </div>
        </AuthFormPanel>
      </div>
    );

  return <Loading />;
}
