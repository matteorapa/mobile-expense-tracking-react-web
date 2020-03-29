import React from 'react';
import {Link} from "react-router-dom";
import authentication from '../authentication';

export default class Account extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      props: props,
      name: '',
      surname: '',
      dob: '',
      email: '',
      password: '',
      verify: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {  
    switch (event.target.name) {
      case 'name':
        this.setState({
          name: event.target.value
        });
        break;
        case 'surname':
          this.setState({
            surname: event.target.value
          });
          break;

        case 'dob':
            this.setState({
              dob: event.target.value
            });
            break;

        case 'email':
              this.setState({
                email: event.target.value
              });
              break;

        case 'password':
                this.setState({
                  password: event.target.value
                });
                break;

        case 'verify':
                this.setState({
                  verify: event.target.value
                });

                  if(event.target.value === this.state.password){
                    
                    //show cross and highlight red and display error text
                    this.setState({
                      match: 'true'
                    });

                  }else {
                    //show check and highlight green
                    this.setState({
                      match: 'false'
                    });
                  }
                  break;
      default:
        break;
    }

    
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.match === 'true'){

      let n = this.state.name;
      let s = this.state.surname;
      let d = this.state.dob;
      let e = this.state.email;
      let p = this.state.password;

      authentication.createUser(n, s, d, e ,p, () => {
          authentication.login(e , p, () => {
            this.state.props.history.push('/vault');
          })
      });

      if(!authentication.isAuthenticated){
        this.setState({
          error: 'Failed. Unable to create account'
        });
      }
      
    }else {
      this.setState({
        error: 'Password does not match with verify'
      });
    }
    
  }

  render() {
      return (
        <div className="main-container">
            <form id="signup" onSubmit={this.handleSubmit} method="post">
              <div className="form-group">
                <h1 className="title-center">Your Account</h1><hr />
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="name" id="firstname" className="form-control" placeholder="First name" value={this.state.name} onChange={this.handleChange} />
                  </div>
                  <div className="col">
                  <label htmlFor="surname">Surname</label>
                    <input type="text" name="surname" id="surname" className="form-control" placeholder="Last name" value={this.state.surname} onChange={this.handleChange} />
                  </div>
                </div>
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" name="dob" className="form-control" id="dob" placeholder="Enter email" value={this.state.dob} onChange={this.handleChange} />

                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}  />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}  />
              </div>
              <div className="form-group">
                  <label htmlFor="verify-password">Verify Password</label>
                  <input type="password" name="verify" className="form-control verify-pass" id="everify-password" placeholder="Verify Password" value={this.state.verify} onChange={this.handleChange}  />
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