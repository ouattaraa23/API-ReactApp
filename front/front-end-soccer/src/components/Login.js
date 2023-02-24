import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check this information in the RestAPI
    navigate("/home");
    console.log(`Submitted username: ${username}, password: ${password}`);
  };

  const handleClick = () => {
    navigate("/register");
  };

  // async function postUser(e) {
  //   e.preventDefault()

  //   try {
  //     await axios.post("", {
  //       username,
  //       password
  //     })
  //   } catch(err) {
  //     console.log(err.message)
  //   }
  // }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        <button type="submit">Log In</button>
      </form>
      <div>
        <button onClick={handleClick}>Register</button>
      </div>
    </div>
  );
}

export default Login;