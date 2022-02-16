import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { signUpWithEmailPassword, currentUser, googleSignOut } = useAuth();
  // const [error, setError] = useState(false);
  const { name, email1 } = currentUser;
  console.log(name, email1)
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        // return setError("Your Password and Confirm password is not match!");
        return toast.warning("Your Password and Confirm password is not match!", {
          position: "top-right",
          // icon:"🚀",
          theme: "dark"
        });
      }
      await signUpWithEmailPassword(username, email, password);
      toast.success("Sign up sucessfull!", {
        position: "top-right",
        icon: "🚀",
        theme: "dark"
      });
    } catch (err) {
        console.log(err);
        const  validateEmail = (email)=> {
          let re = /\S+@\S+\.\S+/;
          return re.test(email);
      }
      
       if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
        // setError('This Email Already used');
        toast.warning("This Email Already used!", {
          position: "top-right",
          // icon:"🚀",
          theme: "dark"
        });
      }
      else if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        // setError('Password should be at least 6 characters');
        toast.warning("Password should be at least 6 characters", {
          position: "top-right",
          // icon:"🚀",
          theme: "dark"
        });
        
      }
      else if(!validateEmail(email)){
        toast.warning("Enter Correct Email!", {
          position: "top-right",
          // icon:"🚀",
          theme: "dark"
        });
      }
      else {
        // setError("failded to create an account!");
        toast.warning("failded to create an account!", {
          position: "top-right",
          // icon:"🚀",
          theme: "dark"
        });
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
      <div className="mt-5 p-5">
      <div className="row mb-3 ">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Username</label>
          <div className="col-sm-10">
            <input 
            className="form-control" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
             />
          </div>
        </div>
        <div className="row mb-3 ">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input 
            type="email" 
            className="form-control" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input 
            type="password" 
            className="form-control"  
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            />
          </div>
        </div>
        <div className="row mb-3" >
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Confirm Password</label>
          <div className="col-sm-10">
            <input type="password" 
            className="form-control "  
            value={confirmPassword}
            onChange={(e)=>setconfirmPassword(e.target.value)}
            required
            />
          </div>
        </div>
      </div>
        
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
      {name && (
        <div><h1>wellcome: {name}</h1>
          <button onClick={googleSignOut}>SignOut</button></div>)}

    </>
  );
};
export default SignUp;