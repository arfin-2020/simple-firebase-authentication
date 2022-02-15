import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,
  signOut
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import "../Firebase/Firebase.config";

const AuthContext = createContext();
const provider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error1, setError] = useState(false);
  const auth = getAuth();

  // Google SignIn
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        // console.log('user details--------', loggedInUser);
        setCurrentUser(loggedInUser);
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log("error-----", errorMessage);
      });
  };

  //Github signIn

  const handleGithubSignIn = () => {
    signInWithPopup(auth, GithubProvider)
      .then(result => {
        const { displayname, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayname,
          email: email,
          photo: photoURL,
        };
        setCurrentUser(loggedInUser);
      })
      .catch(error => {
        console.log("error-------", error.message);
      });
  };

  // SignUp with name, email , password
  const signUpWithEmailPassword = async (username, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    const loggedInUser = {
      name: username,
      email1: email,
    };
    setCurrentUser(loggedInUser);
  };

  // LogIn with email & password
  const logInWithEmailPassword = async(email, password) =>{
   return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const {displayName, email} = userCredential.user;
      const loggedInUser ={
        name: displayName,
        email:email
      }
      setError('');
      setCurrentUser({...loggedInUser})
    })
    // .catch((error) => {
    //   console.log('error',error.message)
    //    setError('User not found!');
     
    // });
    // return signInWithEmailAndPassword(auth, email, password);
  }
  // Google SignOut function

  const googleSignOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser({});
      })
      .catch(error => {
        console.log("error-------", error.message);
      });
  };

  const value = {
    currentUser,
    handleGoogleSignIn,
    handleGithubSignIn,
    googleSignOut,
    signUpWithEmailPassword,
    logInWithEmailPassword,error1
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
