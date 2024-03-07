import axios from "axios";
import React, { useState } from "react";

export default function Category() {
  let [categories, setCategories] = useState([]);

  async function getAllCategories() {
    let { data } = await axios.get(
      "https://elgendystore-1.onrender.com/getAllCategories"
    );
    console.log(data);
  }

  return <div></div>;
}
