

import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import AuthProvider from './Context/AuthContext';
function App() {  
  return (
    <div>
    
    <AuthProvider>
    <div className="App">
      <Login/>
      {/* <SignUp/> */}
    </div>
    </AuthProvider>
    <ToastContainer />
    </div>
  );
}

export default App;
