import './App.css';
import MainPage from './components/MainPage';
import Register from './components/Register';
import Login from './components/Login';
import {Route, Routes} from "react-router-dom";

function App() {

  return (
  <div>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<MainPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
  </div>)
} 
export default App;
