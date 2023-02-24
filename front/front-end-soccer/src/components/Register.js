import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './Validation';
import './Register.css';

function Register() {

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
      })

    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check for valid data
    setErrors(Validation(values));

    if (!(errors.username) && !(errors.email) && !(errors.password)) {
        // Pass this information to a RestAPI
        try{
        postUser(event);
        } catch(err) {
            setValid(false);
        }
    }
  };

  async function postUser(e) {
    e.preventDefault()

    const username = values.username;
    const email = values.email;
    const password = values.password;

    try {
      await axios.post("http://localhost:28017/Users/register", {
        username,
        email,
        password
      })
      navigate("/");
      console.log(`Submitted username: ${values.username}, email: ${values.email}, password: ${values.password}`);
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
          <input type="text" placeholder="Enter Username" value={values.username} name="username" onChange={handleChange} />
          {errors.username && <p style={{color: "red", fontSize: "13px"}}>{errors.username}</p>}
        <label>Email</label>
          <input type="text" placeholder="Enter Email" value={values.email} name="email" onChange={handleChange} />
          {errors.email && <p style={{color: "red", fontSize: "13px"}}>{errors.email}</p>}
        <label>Password</label>
          <input type="password" placeholder="Enter Password" value={values.password} name="password" onChange={handleChange} />
          {errors.password && <p style={{color: "red", fontSize: "13px"}}>{errors.password}</p>}
        <button type="submit">Submit</button>
        {valid && <p>An account already exists under this username</p>}
      </form>
    </div>
  );
}

export default Register;