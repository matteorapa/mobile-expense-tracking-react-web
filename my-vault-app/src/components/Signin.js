


import React from 'react';
import {Link} from "react-router-dom";
import './component.css';

export default class Sidebar extends React.Component {

  
    render() {
      return (
        <form>
            <h3>Sign In</h3>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="">
                <button type="submit" className="btn btn-primary">Signin</button>
                <Link to="/account">Create an account</Link>
            </div>
            
            
        </form>
      );
    }
  }