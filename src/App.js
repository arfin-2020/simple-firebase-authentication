import './App.css';
import Login from './Component/Login';
import AuthProvider from './Context/AuthContext';
function App() {  
  return (
    <AuthProvider>
    <div className="App">
      <Login/>
    </div>
    </AuthProvider>
  );
}

export default App;
