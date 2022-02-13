import './App.css';
import SignUp from './Component/SignUp';
import AuthProvider from './Context/AuthContext';
function App() {  
  return (
    <AuthProvider>
    <div className="App">
      {/* <Login/> */}
      <SignUp/>
    </div>
    </AuthProvider>
  );
}

export default App;
