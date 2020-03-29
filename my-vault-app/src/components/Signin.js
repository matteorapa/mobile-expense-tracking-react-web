


import React from 'react';
import {Link} from "react-router-dom";
import './component.css';

export default class Welcome extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user_email : '',
      user_password : ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.authenticateUser(this.state.user_email, this.state.user_password, (error) => {
      this.setState({
        error : error
      });
    }); 
  }

  handleChange(event){  

    switch (event.target.name) {
      case 'email':
        this.setState({
          user_email: event.target.value
        });
      break;

      case 'password':
          this.setState({
            user_password: event.target.value
          });
      break;
      default:
        break;
    }
  }


  render(){
    return(
      <form id="signin" onSubmit={this.handleSubmit} method="post">
          <div className="form-group">
              
              <h3>Sign In</h3>
              <label htmlFor="exampleInputEmail3">Email address</label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.user_email} onChange={this.handleChange} required/>
              
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.user_password} onChange={this.handleChange} required/>
              <small className="form-text- text-danger text-center">{this.state.error}</small> 
          </div>

          <div className="form-group submit">
              <button type="submit" className="btn btn-primary">Signin</button>
              <small id="emailHelp" className="form-text text-muted">Don't have an account? <Link to="/account">Sign up</Link></small> 
          </div>
      </form>
    );
  }
}




  