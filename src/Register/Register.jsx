import React, { useState } from "react";
import signUpPicture from "../assets/Capture.PNG";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
export default function Register() {
  let navigate = useNavigate();
  let [message, setMessage] = useState("");
  let [isClicked, setIsClicked] = useState(false);
  async function register(values) {
    setIsClicked(true);

    let { data } = await axios.post(
      "https://elgendystore-1.onrender.com/user/signUp",
      values
    );
    console.log(data);

    if (data.message === "Added") {
      setMessage("we have sent a verification email to ");
      navigate("/auth/login");
    } else if (
      data.message === "try another email this email is already registered"
    ) {
      setMessage("Try another email this email is already registered");
    }
  }

  const validationSchema = Yup.object({
    userName: Yup.string()
      .max(20, "name is to long")
      .min(3, "name is too short")
      .required("user name required"),
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
    CPassword: Yup.string()
      .oneOf([Yup.ref("password")], "pasword and CPassword should be matched")
      .required("required"),
    age: Yup.number()
      .min(15, "you ae underage you can't create an account")
      .required("Age is required"),
    country: Yup.string()
      .min(3, "invalid country name")
      .required("country is required"),
    city: Yup.string().min(3, "invalid city name").required("city is required"),
    street: Yup.string()
      .min(3, "invalid street name")
      .required("street is required"),
    role: Yup.string()
      .oneOf(["admin", "user"], "role must be admin or user")
      .required("role is required"),
    gender: Yup.string()
      .oneOf(["female", "male"], "gender must be a male or female")
      .required("gender is required"),
  });
  let formData = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      CPassword: "",
      role: "",
      country: "",
      city: "",
      street: "",
      age: 0,
      gender: "",
    },
    validationSchema,
    onSubmit: register,
  });
  return (
    <div className="row container1 py-5 my-5">
      <div className="col-md-4 photoContainer">
        <img src={signUpPicture} alt="" />
      </div>

      <div className="col-md-8 mx-auto">
        <div className="row py-4">
          <h1 className="mx-auto">Create an account</h1>
          <h4 className="mx-auto">Enter your details here</h4>
        </div>
        <form className="row" onSubmit={formData.handleSubmit}>
          <div className="col-md-6 mb-2">
            <div className="container w-60 mx-auto">
              <input
                type="text"
                name="userName"
                value={formData.values.userName}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                placeholder="Name"
                className="form-control mb-4"
              />
              {formData.errors.userName && formData.touched.userName ? (
                <div className="alert alert-danger">
                  {formData.errors.userName}
                </div>
              ) : null}
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
              <input
                id="CPassword"
                name="CPassword"
                type="password"
                value={formData.values.CPassword}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                placeholder="CPassword"
                className="form-control mb-4"
              />
              {formData.errors.CPassword && formData.touched.CPassword ? (
                <div className="alert alert-danger">
                  {formData.errors.CPassword}
                </div>
              ) : null}
              <input
                type="text"
                name="country"
                value={formData.values.country}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                placeholder="Country"
                className="form-control"
              />
              {formData.errors.country && formData.touched.country ? (
                <div className="alert alert-danger">
                  {formData.errors.country}
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-6">
            <div className="container w-60 mx-auto">
              <input
                type="text"
                name="city"
                value={formData.values.city}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                placeholder="City"
                className="form-control mb-4"
              />

              {formData.errors.city && formData.touched.city ? (
                <div className="alert alert-danger">{formData.errors.city}</div>
              ) : null}
              <input
                type="text"
                name="street"
                value={formData.values.street}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                placeholder="Street"
                className="form-control mb-4"
              />
              {formData.errors.street && formData.touched.street ? (
                <div className="alert alert-danger">
                  {formData.errors.street}
                </div>
              ) : null}
              <input
                type="number"
                name="age"
                value={formData.values.age}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                placeholder="age"
                className="form-control mb-4"
              />
              {formData.errors.age && formData.touched.age ? (
                <div className="alert alert-danger">{formData.errors.age}</div>
              ) : null}
              <select
                className="form-control mb-4"
                name="gender"
                id="gender"
                value={formData.values.gender}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {formData.errors.gender && formData.touched.gender ? (
                <div className="alert alert-danger">
                  {formData.errors.gender}
                </div>
              ) : null}
              <select
                className="form-control mb-4"
                name="role"
                id="role"
                value={formData.values.role}
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {formData.errors.role && formData.touched.role ? (
                <div className="alert alert-danger">{formData.errors.role}</div>
              ) : null}
            </div>
          </div>
          <div className="row">
            {isClicked ? (
              <div className="alert alert-info">{message}</div>
            ) : null}
            <div className="col-md-6 cont mb-2">
              <Link className="w-50 text-dark link">
                Already have account ?
              </Link>
            </div>
            <div className="col-md-6 cont mb-2">
              <button type="submit" className="btn btn-danger text-white w-50 ">
                Create account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
