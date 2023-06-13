import "./login.css";
import { Link } from "react-router-dom";
import { AUTH } from "../../backend";
const Login = () => {
  const googleAuth = () => {
    window.open(`${AUTH}/auth/google/callback`, "_self");
  };

  return (
    <div className="container">
      <h1 className="heading">Login Form</h1>
      <div className="form_container">
        <div className="left">
          <h2>Image</h2>
        </div>
        <div className="right">
          <h2 className="from_heading">Member Login</h2>
          <input type="text" className="input" placeholder="email" />
          <input type="text" className="input" placeholder="passport" />
          <button className="btn">Login</button>
          <p className="text">or</p>
          {/* <button className="google_btn" alt="google icon"> */}
          <button onClick={googleAuth}>Sign in With Google</button>
          <p className="text">
            New Here ? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
