import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
const Login = () => {
  const { handleGoogleSignIn, currentUser, handleGithubSignIn, googleSignOut,logInWithEmailPassword,error1 } =
    useAuth();
    // console.log('error----', error1);
  // const { name, photo } = currentUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit =(e) =>{
    e.preventDefault();
      logInWithEmailPassword(email, password);
        setSuccess('You are successfully logged in!'); 
  }
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit Now</button>
      </form>
      
      {error1 ? <p style={{ color: "red" }}>{error1}</p> :null}
      {!error1 && success ? <p style={{ color: "green" }}>{success}</p> : null}
      {/* {!name ? (
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
      ) : null} */}

      
    </div>
  );
};

export default Login;
