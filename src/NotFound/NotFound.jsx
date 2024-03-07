import React from "react";
import notFoundImage from "../assets/images/Page_not_found.png";
import "./NotFound.css";
export default function NotFound() {
  return (
    <>
      <div className="imgContainer">
        <img src={notFoundImage} alt="notfoundimage" className="imgStyle" />
      </div>
    </>
  );
}
