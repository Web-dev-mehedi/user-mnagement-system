import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddUsers from "./components/AddUsers.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import AllUsers from "./components/AllUsers.jsx";
import SignUp from "./auth/SignUp.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import Login from "./auth/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AllUsers />,
        loader: () => fetch("https://user-management-server-six.vercel.app/users"),
      },
      {
        path: "/addUsers",
        element: <AddUsers />,
      },
      {
        path: "/updateUsers",
        element: <UpdateUser />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
        loader: () => fetch("https://user-management-server-six.vercel.app/users"),
      },
      {
        path: "/login",
        element: <Login />,
        loader: () => fetch("https://user-management-server-six.vercel.app/users"),
      },
    ],
  },
]);

//
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthProvider>
  </StrictMode>
);
