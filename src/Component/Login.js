import React from "react";
import { useAuth } from "../Context/AuthContext";
const Login = () => {
  const { handleGoogleSignIn, currentUser, handleGithubSignIn, googleSignOut } =
    useAuth();

  const { name, photo } = currentUser;

  return (
    <div>
      {!name ? (
        <div>
          <button onClick={handleGoogleSignIn}>Login with google</button>
          <button onClick={handleGithubSignIn}>Login with Github</button>
          <br />
        </div>
      ) : (
        <button onClick={googleSignOut}>Google SignOut</button>
      )}

      {currentUser ? (
        <div>
          <h1>{name}</h1>
          <img src={photo} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default Login;
