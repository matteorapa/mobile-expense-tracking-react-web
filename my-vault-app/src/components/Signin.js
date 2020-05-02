


import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import authentication from '../authentication';


class Signin extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      user_email : '',
      user_password : '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };


  async handleSubmit(event){
    const {history} = this.props;
    event.preventDefault();
    let error = true;
    await authentication.login(this.state.user_email, this.state.user_password, () => { 
      error = false;
      history.push('/vault');
    });

    if(error){
      this.setState({
        error: 'Incorrect email or password'
      });
    }
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
              <label htmlFor="email">Email address</label>
              <input type="text" name="email" className="form-control" id="email" placeholder="Enter email" value={this.state.user_email} onChange={this.handleChange} required/>
              
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" id="password" placeholder="Password" value={this.state.user_password} onChange={this.handleChange} required/>
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

export default withRouter(Signin);




  