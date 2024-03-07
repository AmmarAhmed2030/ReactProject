import { Link } from "react-router-dom";

export default function Verify() {
  return (
    <div>
      <div className="row py-5">
        We hane sent a verification email to your email please verify before
        login
      </div>
      <Link className="btn btn-success" to={"auth/login"}>
        Go To Login
      </Link>
    </div>
  );
}
