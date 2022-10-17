import React from "react";
import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <nav className="text-center">
        <Link className="mx-10" to="/login">
          Login
        </Link>
        <Link className="mx-10" to="/register">
          Register
        </Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
