import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
const Login = () => {
  const { handleGoogleSignIn, currentUser, handleGithubSignIn, googleSignOut,logInWithEmailPassword } =
    useAuth();
    // console.log('current user----', currentUser);
  // const { name, photo } = currentUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const handleSubmit =async(e) =>{
    console.log('enterd');
    e.preventDefault();
    try{
      setError("")
      await logInWithEmailPassword(email, password);
    }catch(error){
      console.log(error);
    }
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
      {error && <p style={{ color: "red" }}>{error}</p>}
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
