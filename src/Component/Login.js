import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
const Login = () => {
  const { handleGoogleSignIn, currentUser, handleGithubSignIn, googleSignOut,logInWithEmailPassword,error1 } =
    useAuth();

    console.log('email----', currentUser.email);
    // console.log('error----', error1);
  // const { name, photo } = currentUser;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const handleSubmit =async(e) =>{
    e.preventDefault();
    try{
      await logInWithEmailPassword(email, password);
      // setSuccess('You are successfully logged in!'); 
      toast.success("Login sucessfull!",{
        position:"top-right",
        icon:"🚀",
        theme: "dark"
      });
    }catch(error){
      // console.log('catch---error',error)
      toast.error("User not found!",{
        position:"top-right",
        theme: "dark"
      });
    }
     
    // try{
    //   await logInWithEmailPassword(email, password);
    //   setSuccess('You are successfully logged in!'); 
    // }catch(err){
    //   console.log(err);
    //  if(err.message === 'Firebase: Error (auth/wrong-password).'){
    //   setError('Wrong Password!');
    //  }else{
    //    setError('User Not Found!')
    //  }
      
    // }
        
  }
  return (
    <div>
    <h1>{loggedIn ? "Login" : "Register"} </h1>
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

        <br/><br/>
        <input type='checkbox' onClick={(e)=>setLoggedIn(e.target.checked)}/> log in
        <br/><br/>
        <button type="submit">Submit Now</button>
      </form>
      
      {/* {error1 ? <p style={{ color: "red" }}>{error1}</p> :null} */}
      {/* {!error1 && success ? <p style={{ color: "green" }}>{success}</p> : null} */}
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
