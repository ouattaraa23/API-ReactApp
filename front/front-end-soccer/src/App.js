import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import {Route, Routes} from "react-router-dom";

function App() {

  return (
  <div>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<MainPage />} />
  </Routes>
  </div>)
} 
export default App;
