import React, { useContext } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

import { tokenContext } from "../Context/tokenContext";
import { useSelector } from "react-redux";
export default function NavBar() {
  const { cartTotalQuantity } = useSelector((state) => {
    return state.cart;
  });
  let { token, setToken } = useContext(tokenContext);
  console.log(token);
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  function login() {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }
  return (
    <div className="navbar text-white">
      <div className="container">
        <div className="row navcontainer">
          <div className="col-2 brandContainer">
            <h4 className="exclusive">ElgendyStore</h4>
          </div>
          <div className="col-6 row links-container">
            {token ? (
              <>
                <Link to={"/"} className="nav-link col-2 offset-1">
                  Home
                </Link>

                <Link to={"about"} className="nav-link col-2 offset-1">
                  About
                </Link>

                {token ? (
                  <Link
                    className=" offset-1 col-2 btn btn-danger logout ms-100"
                    to={"/login"}
                    onClick={logout}
                  >
                    Logout
                  </Link>
                ) : (
                  <button
                    className="col-2 btn btn-danger logout mx-auto"
                    onClick={login}
                  >
                    Login
                  </button>
                )}
              </>
            ) : (
              <>
                <Link to={"register"} className="nav-link col-2 offset-1">
                  Sign Up
                </Link>
                <Link to={"login"} className="nav-link col-2 offset-1">
                  Login
                </Link>
              </>
            )}
          </div>
          <div className="col-3 offset-1 searchContainer">
            <input
              type="text"
              placeholder="What are you looking for ?"
              className="search-input col-8"
            />

            <Link to={"cart"} className="cartIcon">
              <i className="fa-solid fa-cart-shopping cart col-2 offset-2"></i>
              <span className="navBarQuantity">{cartTotalQuantity}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
