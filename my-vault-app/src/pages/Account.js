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
            

            <form id="signup">
              <div className="form-group">
                <h1 className="title-center">Your Account</h1><hr />
                <div className="form-row">
                  <div className="col">
                    <label for="firstname">First Name</label>
                    <input type="text" id="firstname" className="form-control" placeholder="First name" />
                  </div>
                  <div className="col">
                  <label for="surname">Surname</label>
                    <input type="text" id="surname" className="form-control" placeholder="Last name" />
                  </div>
                </div>
                </div>
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                  <label for="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <div className="form-group">
                  <label for="verify-password">Verify Password</label>
                  <input type="password" className="form-control" id="everify-password" placeholder="Verify Password" />
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary">Create Account</button>
                  <small  className="form-text text-muted">Already have an account? <Link to="/">Sign in instead.</Link></small>
                  
              </div>
            </form>
            
        </div>
      );
    }
  }