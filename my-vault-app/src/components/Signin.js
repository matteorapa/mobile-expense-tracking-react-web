


import React from 'react';
import {Link} from "react-router-dom";
import './component.css';

let email = '';
let password = '';

const handleSubmit = (event) => {  
    event.preventDefault();
    
    console.log('pressed login');
    
};

const handleChange = (event) =>{  
  switch (event.target.name) {
    case 'email':

        email = event.target.value
    
      break;
      case 'password':
  
        password = event.target.value
     
      break;
    }
  }


const Signin = (props) => { 
  
    return (
        <form id="signin" onSubmit={handleSubmit} method="post">
            <div className="form-group">
                <h3>Sign In</h3>
                <label htmlFor="exampleInputEmail3">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} required/>
                
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChange} required/>
            </div>

            <div className="form-group submit">
                <button type="submit" className="btn btn-primary">Signin</button>
                <small id="emailHelp" className="form-text text-muted">Don't have an account? <Link to="/account">Sign up</Link></small> 
            </div>
        </form>
      );
  }

  export default Signin;


  