import React, { useState } from "react";
import app from "../firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // password validation
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("please provide at least two uppercase");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError("please add atleast one special character");
      return;
    }
    if (password.length < 6) {
      setPasswordError("password must be atleast 6 characters");
      return;
    }

    setPasswordError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setSuccess(true);
        // form.reset();
        event.target.reset();
        verifyEmail();
        updateUserProfile(name);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        setPasswordError(error.message);
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert(
        "please varify your email, if did not get varifiaction email please check your spam folder!"
      );
    });
  };

  const updateUserProfile = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("profile updated");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="text-center my-5">
      <form className="form-control" onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="input px-2 py-1 input-bordered rounded input-primary w-full max-w-xs border border-purple-400 "
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="input px-2 py-1 input-bordered rounded input-primary w-full max-w-xs border border-purple-400 "
        />
        <br />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Your password"
          required
          className="input px-2 py-1 input-bordered rounded input-primary w-full max-w-xs border border-purple-400 "
        />
        <p className="text-red-500">
          <small>{passwordError}</small>
        </p>
        {success && <p className="text-green-500">user created successfully</p>}
        <button
          type="submit"
          className="border px-5 py-1 mt-5 bg-lime-600 rounded-md"
        >
          Register
        </button>
      </form>
      <p>
        <small>
          Already have an account? please <Link to="/login">Login</Link>
        </small>
      </p>
    </div>
  );
};

export default Register;
