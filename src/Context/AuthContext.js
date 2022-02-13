import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import "../Firebase/Firebase.config";


const AuthContext = createContext();
const provider = new GoogleAuthProvider();

export const useAuth = () =>{
    return useContext(AuthContext)
}
const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    const handleGoogleSignIn =() => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const {displayName, photoURL, email} = result.user;
        const loggedInUser = {
            name: displayName,
            email:email,
            photo: photoURL
        }
        console.log('user details--------', loggedInUser);
        setCurrentUser(loggedInUser)
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log('error-----',errorMessage);
      });
      
  };

  const value={
      currentUser,
      handleGoogleSignIn,
    }
    
    
  return (
    <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;
