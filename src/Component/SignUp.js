import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { signUpWithEmailPassword, currentUser,googleSignOut } = useAuth();
  const [error, setError] = useState(false);
  const { name,email1 } = currentUser;
    console.log(name, email1)
    const notify = () => toast("Wow so easy !");
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // return setError("Your Password and Confirm password is not match!");
      
    }
    try {
      setError("");
      await signUpWithEmailPassword(username, email, password);
    } catch (err) {
    //   console.log(err);
      if(err.message === 'Firebase: Error (auth/email-already-in-use).'){
          setError('This Email Already used');
      }
      else if(err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
          setError('Password should be at least 6 characters');
      }
      else{
          setError("failded to create an account!");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <br />
        <br />
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
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter Confirm password"
          value={confirmPassword}
          onChange={e => setconfirmPassword(e.target.value)}
          required
        />
        <br />
        <br />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" onClick={notify}>Submit Now</button>
      </form>
      { name && (
          <div><h1>wellcome: {name}</h1>
        <button onClick={googleSignOut}>SignOut</button></div>)}
        <ToastContainer/>
    </>
  );
};
export default SignUp;
