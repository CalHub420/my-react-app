import React, { useContext } from "react";
import { AuthContext } from "../context";

function Login() {
  const { handleLogin, activeAccount } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="content-container">
        <h2 className="banner-header1">Welcome to the Summit Support Hub</h2>
        <button as="button" onClick={handleLogin}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Login;
