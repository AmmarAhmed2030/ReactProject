import { useEffect, useState } from "react";

export default function Gallery() {
  let [counter, setCounter] = useState(0);
  let [userName, setUserName] = useState("Ammar");

  function changeCounter() {
    setCounter(Math.random() * 20);
  }
  function updateName() {
    setUserName("Ahmed");
  }
  useEffect(() => {
    if (counter === 0 && userName === "Ammar") return;
    console.log("hello from useEffect");
  }, [counter, userName]);
  return (
    <>
      <h1>Hello from Gallery function component</h1>
      <h3>Counter : {counter}</h3>
      <h3>User Name :{userName}</h3>
      <button className="btn btn-info" onClick={changeCounter}>
        Change Counter
      </button>
      <button className="btn btn-info" onClick={updateName}>
        Change Name
      </button>
    </>
  );
}
