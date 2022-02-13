import React from 'react';
import { useAuth } from '../Context/AuthContext';
const Login = () =>{
    const {handleGoogleSignIn, currentUser} = useAuth();
    const {name,photo} = currentUser;
    
    return(
        <div>
            <button onClick={handleGoogleSignIn}>Login with google</button>
            {
                currentUser && <div>
                <h1>{name}</h1>
                <img src={photo}/> 
                </div>
                
            }
        </div>
    )
}

export default Login;