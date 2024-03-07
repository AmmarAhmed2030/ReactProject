import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";

export default function SecondLayout() {
  return (
    <div>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
