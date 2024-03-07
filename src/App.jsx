import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import About from "./About/About";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Contact from "./Contact/Contact";
import Login from "./Login/Login";
import Register from "./Register/Register";

import Layout from "./Layout/Layout";

import Home from "./Home/Home";

import NotFound from "./NotFound/NotFound";
import Setting from "./Setting/Setting";
import Web from "./Web/Web";
import Profile from "./Profile/Profile";
import { tokenContext } from "./Context/tokenContext";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./ProductDetails/PoductDetails";
import Cart from "./Cart/Cart";
import { ToastContainer } from "react-toastify";
const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },

      {
        path: "about",
        element: (
          <ProtectedRoutes>
            <About />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoutes>
            <Contact />
          </ProtectedRoutes>
        ),
      },

      {
        path: "setting",
        element: (
          <ProtectedRoutes>
            <Setting />
          </ProtectedRoutes>
        ),
        children: [
          { path: "web", element: <Web /> },
          { path: "profile", element: <Profile /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default function App() {
  let { setToken } = useContext(tokenContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}
