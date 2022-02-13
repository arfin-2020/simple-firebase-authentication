import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
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
  const signInWithEmailPassword = async (username, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    // update profile
    // await updateProfile(auth.currentUser, {
    //   displayName: username,
    // });
    // const {displayName, email} = auth.currentUser;
    const loggedInUser = {
      name: username,
      email: email,
      password: password,
    };
    setCurrentUser(loggedInUser);
  };
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
    signInWithEmailPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
