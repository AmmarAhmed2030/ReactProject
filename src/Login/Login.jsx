import React, { useContext, useState } from "react";
import signUpPicture from "../assets/Capture.PNG";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { tokenContext } from "../Context/tokenContext";
import "./Login.css";
export default function Login() {
  let { setToken } = useContext(tokenContext);
  let navigate = useNavigate();
  let [isClicked, setIsClicked] = useState(false);
  let [message, setMessage] = useState("");
  let [isLoader, setIsLoader] = useState(false);
  async function login(values) {
    setIsClicked(true);
    let { data } = await axios.post(
      "https://elgendystore-1.onrender.com/user/signIn",
      values
    );
    console.log(data);
    if (data) {
      setIsLoader(false);
    } else if (!data) {
      setIsLoader(true);
    }
    console.log(data.message);
    if (data.message === "welcome") {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else if (data.message === "You need to register first") {
      setMessage("You need to register first");
    } else if (data.message === "please verify your account first") {
      setMessage(
        `We have sent a verification email to :  ${values.email}  
          please verify your account first`
      );
    } else if (data.message === "invalid user") {
      setMessage("invalid user");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("invalid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|eg)$/,
        "email must match this xxxx@xxx.eg|com"
      )
      .required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("required"),
  });
  let formData = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });
  return (
    <div className="row container1  my-5">
      <div className="col-md-4 photoContainer">
        <img src={signUpPicture} alt="" />
      </div>

      <div className="col-md-8">
        <div className="row py-5">
          <div className="row">
            <h1 className="offset-1 offset-md-3 col-md-6 py-1 title">
              Log in to ElgendyStore
            </h1>
          </div>
          <div className="row">
            <h4 className="offset-1  offset-md-3 col-md-6 py-4 detail">
              Enter your details below
            </h4>
          </div>
        </div>
        <form className="row" onSubmit={formData.handleSubmit}>
          <div className="offset-1  offset-md-3 col-10 col-md-6">
            <div className="row">
              <input
                type="email"
                name="email"
                value={formData.values.email}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                placeholder="email address"
                className="form-control mb-4"
              />
              {formData.errors.email && formData.touched.email ? (
                <div className="alert alert-danger">
                  {formData.errors.email}
                </div>
              ) : null}
            </div>
            <div className="row">
              <input
                type="password"
                name="password"
                value={formData.values.password}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                placeholder="password"
                className="form-control mb-4"
              />

              {formData.errors.password && formData.touched.password ? (
                <div className="alert alert-danger">
                  {formData.errors.password}
                </div>
              ) : null}
            </div>

            <div className="row">
              {isClicked && message ? (
                <div className="alert alert-info">{message}</div>
              ) : null}

              <button
                type="submit"
                className="bgColor text-white col-12 col-md-6 mb-4"
              >
                Login
              </button>

              <Link className=" col-12 col-md-6 mb-6 forget colo">
                Forget Password ?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
