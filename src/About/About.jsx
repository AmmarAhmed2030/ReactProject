import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase, increaseByValue } from "../Redux/CounterSlice";
import girlsPhoto from "../assets/images/About.jpg";
export default function About() {
  return (
    <div className="container ">
      <div className="row py-5 my-5">
        <div className="col-md-6">
          <h1>Our Story</h1>
          <p className="py-5">
            orem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <p className="py-2">
            orem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
          </p>
        </div>
        <div className="col-md-6">
          <img src={girlsPhoto} alt="" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}
