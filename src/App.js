import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main";
import Login from "./Login/Login";
import Register from "./Register/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/register",
          element: <Register></Register>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
      ],
    },
  ]);
  // const handleEmailChange = (event) => {
  //   const email = event.target.value;
  //   console.log(email);
  // };

  // const handlePasswordChange = (event) => {
  //   const password = event.target.value;
  //   console.log(password);
  // };
  return (
    <div className="m-10">
      <RouterProvider router={router}></RouterProvider>

      {/* <form onSubmit={handleRegister}>
        <input
          onChange={handleEmailChange}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <br />
        <input
          onChange={handlePasswordChange}
          type="password"
          name="password"
          placeholder="Your password"
        />
        <br />
        <button type="submit">Register</button>
      </form> */}
    </div>
  );
}

export default App;
