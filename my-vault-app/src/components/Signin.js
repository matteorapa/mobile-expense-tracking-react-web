


import React from 'react';
import {Link} from "react-router-dom";
import authentication from '../authentication';
import './component.css';

export default class Sidebar extends React.Component {

  
    render() {
      return (
        <form id="signin">
            <div className="form-group">
                <h3>Sign In</h3>
                <label for="exampleInputEmail3">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Enter email" />
                
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />

                
            </div>
            <div className="form-group submit">
                <button type="submit" className="btn btn-primary" onClick={
                  () => {
                      authentication.authenticate(() => {
                        this.props.history.push('/vault');
                      })
                    }
                  }
                >Signin</button>
                <small id="emailHelp" className="form-text text-muted">Don't have an account? <Link to="/account">Sign up</Link></small> 
            </div>
                

        </form>
      );
    }
  }