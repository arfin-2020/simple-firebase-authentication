import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { signUpWithEmailPassword, currentUser, googleSignOut,emailVerification,resetPassword } = useAuth();
  // const [error, setError] = useState(false);
  const { name, email1 } = currentUser;
  console.log(name, email1);
  console.log(password, confirmPassword);

  
  const handleSubmit = async e => {
    
    e.preventDefault();
    try {
      const validatePassword = (password) => {
        let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
      };
      // console.log(!validatePassword(password))
      if(!validatePassword(password)){

        return toast.warning(
          "Your Password Must be Minimum eight characters, at least one letter and one number!",
          {
            position: "top-right",
            // icon:"🚀",
            theme: "dark",
          }
        );
        
      }
      if (password !== confirmPassword) {
        // return setError("Your Password and Confirm password is not match!");
        return toast.warning(
          "Your Password and Confirm password is not match!",
          {
            position: "top-right",
            // icon:"🚀",
            theme: "dark",
          }
        );
      }
      const validateEmail = email => {
        let re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return re.test(email);
      };
      console.log(!validateEmail(email));
      if (!validateEmail(email)) {
        return toast.warning("Enter Correct Email!", {
          position: "top-right",
          // icon:"🚀",
          theme: "dark",
        });
        
      }
    
      await signUpWithEmailPassword(username, email, password);
      emailVerification();
      toast.success("Sign up sucessfull & check your mail for verify!", {
        position: "top-right",
        icon: "🚀",
        theme: "dark",
      });
    } catch (err) {
      console.log(err);

      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        // setError('This Email Already used');
        toast.warning("This Email Already used!", {
          position: "top-right",
          // icon:"🚀",
          theme: "dark",
        });
      } else if (
        err.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        // setError('Password should be at least 6 characters');
        toast.warning("Password should be at least 6 characters", {
          position: "top-right",
          // icon:"🚀",
          theme: "dark",
        });
      } else {
        // setError("failded to create an account!");
        toast.warning("failded to create an account!", {
          position: "top-right",
          // icon:"🚀",
          theme: "dark",
        });
      }
    }
  };
  const resetPasswordToEmail = async(email) =>{
    try{
      await resetPassword(email);
      toast.info("Please Check your mail", {
        position: "top-right",
        // icon:"🚀",
        theme: "dark",
      });
    }catch(err){
     console.log(err);
     
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 p-5">
          <div className="row mb-3 ">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3 ">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Confirm Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control "
                value={confirmPassword}
                onChange={e => setconfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign in
        </button><br/><br/>
      </form>
      <button onClick={()=>resetPasswordToEmail(email)}>Reset Password</button>
      {name && (
        <div>
          <h1>wellcome: {name}</h1>
          <button onClick={googleSignOut}>SignOut</button><br/>
          
        </div>
      )}
      
    </>
  );
};
export default SignUp;
