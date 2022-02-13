import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { signInWithEmailPassword, currentUser,googleSignOut } = useAuth();
  const [error, setError] = useState(false);
  const { name } = currentUser;

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Your Password and Confirm password is not match!");
    }
    try {
      setError("");
      await signInWithEmailPassword(username, email, password);
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
        <button type="submit">Submit Now</button>
      </form>
      { name && (
          <div><h1>wellcome: {name}</h1>
        <button onClick={googleSignOut}>SignOut</button></div>)}
      
    </>
  );
};
export default SignUp;
