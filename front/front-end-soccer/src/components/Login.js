import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {

  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  const [valid, setValid] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState({})

  const handleChange = (e) => {
  setValues({...values, [e.target.name]: e.target.value})};

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check this information in the RestAPI
    getUser(event);
  };

  const handleClick = () => {
    navigate("/register");
  };

  async function getUser(e) {
    e.preventDefault()

    const username = values.username
    const password = values.password

    if(username) {
    try {
      await axios.get(`http://localhost:28017/Users/user/${username}`)
      .then(res => {
        const u = res.data;
        console.log(u);
        if (password === u.password){
          setUser(u);
          navigate("/home");
          console.log(`Passed username: ${username} and password: ${password}`);
        } else {
          setValid(true);
          setError("Incorrect Password");
        }
      })
    } catch(err) {
      setValid(true);
      setError("Incorrect Username/Password");
      console.log(err.message)
    }
  }
}

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
          <input type="text" placeholder="Enter Username" value={values.username} name="username" onChange={handleChange} />
        <label>Password:</label>
          <input type="password" placeholder="Enter Password" value={values.password} name="password" onChange={handleChange} />
        <button type="submit">Log In</button>
        {valid && <p>{error}</p>}
      </form>
      <div>
        <button onClick={handleClick}>Register</button>
      </div>
    </div>
  );
}

export default Login;