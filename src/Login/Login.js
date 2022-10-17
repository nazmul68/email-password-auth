import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setSuccess(true);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmailBlur = (event) => {
    alert("please type your email before reset password");
    const email = event.target.value;
    setUserEmail(email);
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("Password reset email sent. Please check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <section className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          please login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className=" gap-6 mt-4 ">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                onBlur={handleEmailBlur}
                id="emailAddress"
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          {success && (
            <p className="text-green-400">
              <small>Login successfully done</small>
            </p>
          )}
          <div className="my-2">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600"
            >
              Login
            </button>
          </div>
        </form>
        <button
          onClick={handleResetPassword}
          type="submit"
          className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600"
        >
          Reset Password
        </button>
        <p>
          <small>
            new to this website please <Link to="/register"> Register</Link>
          </small>
        </p>
      </section>
    </div>
  );
};

export default Login;
