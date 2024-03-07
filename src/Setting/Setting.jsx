import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Setting() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3 border border-black">
            <ul>
              <li>
                <Link to={"web"}>Web</Link>
              </li>
              <li>
                <Link to={"profile"}>Profile</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
