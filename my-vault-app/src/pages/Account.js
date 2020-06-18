import React from 'react';
import {Link} from "react-router-dom";
import authentication from '../authentication';
import Header from '../components/Header'

export default class Account extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      surname: '',
      dob: '',
      email: '',
      password: '',
      verify: '',
      error: '',
      verifyMessage: "",
      verifyError: "",
      passwordMessage: "",
      passwordError: "",
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
                
            
                if(event.target.value.length >= 8){
                
                  this.setState({
                    passwordMessage: "✓ Passwords is valid",
                    passwordError: ""
                  });
                  
                }else {
                  this.setState({
                    passwordError: "Password must be at least 8 characters long.",
                    passwordMessage: ""
                  });
                }
                break;

        case 'verify':
                this.setState({
                  verify: event.target.value
                });

                  if(event.target.value === this.state.password){
                    
                    //show cross and highlight red and display error text
                    this.setState({
                      match: 'true',
                      verifyMessage: "✓ Passwords match.",
                      verifyError: ""
                    });
                    console.log("Passwords match")

                  }else {
                    //show check and highlight green
                    this.setState({
                      match: 'false',
                      verifyError: "✗ Passwords not match, please try again!",
                      verifyMessage: ""
                    });
                    console.log("Passwords do not match")
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
            
            const {history} = this.props;
            history.push('/vault');
          })
      });

      if(!authentication.isAuthenticated){
        this.setState({
          error: 'Failed. Unable to create account, please try again!'
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
        <div>
          <Header />
        <div className="main-container focused">
            <form id="signup" onSubmit={this.handleSubmit} method="post">
              <div className="form-group">
                <h1 className="title-center">Your Account</h1><hr />
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="name" id="firstname" className="form-control" placeholder="First name" value={this.state.name} onChange={this.handleChange} required/>
                  </div>
                  <div className="col">
                  <label htmlFor="surname">Surname</label>
                    <input type="text" name="surname" id="surname" className="form-control" placeholder="Last name" value={this.state.surname} onChange={this.handleChange} required/>
                  </div>
                </div>
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" name="dob" className="form-control" id="dob" placeholder="Enter email" value={this.state.dob} onChange={this.handleChange} required/>

                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}  required/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password <span className="text-success">{this.state.passwordMessage}</span><span className="text-warning">{this.state.passwordError}</span></label>
                  <input type="password" name="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
              </div>
              <div className="form-group">
                  <label htmlFor="verify-password">Verify Password <span className="text-success">{this.state.verifyMessage}</span><span className="text-danger">{this.state.verifyError}</span></label>
                  <input type="password" name="verify" className="form-control verify-pass" id="everify-password" placeholder="Verify Password" value={this.state.verify} onChange={this.handleChange} required/>
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary">Create Account</button>
                  <small  className="form-text text-muted">Already have an account? <Link to="/">Sign in instead.</Link></small>
                  
              </div>
            </form>
            
        </div>
      </div>
      );
    }
  }