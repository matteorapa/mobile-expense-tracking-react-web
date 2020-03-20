import React from 'react';
import {Link} from "react-router-dom";

export default class Account extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    
  }
    render() {
      return (
        <div className="main-container">
            <h2>Create an Account</h2>

            <form>
              <div className="form-row">
                <div className="col">
                  <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="col">
                  <input type="text" className="form-control" placeholder="Last name" />
                </div>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
                <label for="exampleInputPassword2">Verify Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" />
            </div>
            <div className="">
                <button type="submit" className="btn btn-primary">Create Account</button>
                <Link to="/account">Create an account</Link>
            </div>
            </form>
            
        </div>
      );
    }
  }