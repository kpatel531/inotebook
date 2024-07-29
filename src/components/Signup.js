import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let history = useNavigate();

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:2000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password})
    });
    const signupData = await response.json()
    if(signupData.success) {
      // Save auth token and redirect to content
      localStorage.setItem("token", signupData.authToken);
      history("/");
      props.showAlert("Successfully created your account", "success");
    } else {
      props.showAlert("Invalid signup data", "danger");
    }
  }
  return (
    <div>
      <h2>Create user for iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" className="form-control" name="name" id="name" onChange={onChange} minLength={3} />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onChange} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
