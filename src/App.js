

import './App.css';
import SignUp from './Component/SignUp';
import AuthProvider from './Context/AuthContext';
function App() {  
  return (
    <div>
    
    <AuthProvider>
    <div className="App">
      {/* <Login/> */}
      <SignUp/>
    </div>
    </AuthProvider>
   
    </div>
  );
}

export default App;
