import React from 'react';
import authentication from '../authentication';
import Header from '../components/Header';
import ThemeColor from '../components/ThemeColor'
import './page.css';

export default class Preferences extends React.Component {
  
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePreferences = this.handlePreferences.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
        name: '',
        surname: '',
        email: '2@2.2',
        currency: '$',
        dob: '2000/05/01',
        message: '',
        error: ''
    }
  }

  componentDidMount(){
    fetch('http://myvault.technology/api/users/details', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authentication.token,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                  let date = new Date(response.output[0].dob);
                  date = date.toLocaleDateString();

                    this.setState({
                        isLoading: false,
                        dataSource: response.output,
                        name: response.output[0].name,
                        surname: response.output[0].surname,
                        email: response.output[0].email,
                        dob: date
                    })
   
              
                }
                else {
                    alert('there was an error loading details')
                }

            })
            .catch((error) => {
                console.log(error);
            });
  }

  handleChange(event) {  
    switch (event.target.name) {
      case 'email':
        this.setState({
          email: event.target.value
        });
        console.log('calling email set state');
      break;

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
      default:
        break;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    await fetch('http://myvault.technology/api/users/update', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authentication.token,
            },
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                dob: this.state.dob
            })
        })


            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    console.log('User details updated successfully');
                }
                else {
                    
                }
            })
            .catch(error => console.warn(error))
  }

  async handlePreferences(event){
    await fetch('http://myvault.technology/api/pref', {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authentication.token,
      },
      body: JSON.stringify({
          colour: this.state.color,
          dark: this.state.dark,
      })
  })


      .then(response => (response.json()))
      .then((response) => {

          if (response.success) {
              this.state.nav.navigate('splashScreen')
          }
          else {
              console.log('something went wrong!')
              console.log(response)
              Alert.alert('Oops!', 'Something went wrong')
          }
      })
      .catch(error => console.warn(error))
  }

  handleReset(event){
    // todo reset password functionality
  }

  handleClose(event){
    //todo close account functionality
  }
  render() {
      return (
        <div>
           <Header />
            <div className="main-container focused">
                <h2 className="text-center">My Account</h2>

                
                <form id="editDetails" onSubmit={this.handleSubmit} method="post">
                <h3>Personal</h3><hr />
                <div className="form-group">
                  <div className="form-row">
                    <div className="col">
                      <label htmlFor="firstname">First Name</label>
                      <input type="text" name="name" id="firstname" className="form-control" placeholder="First name" value={this.state.name} onChange={this.handleChange} required/>
                    </div>
                    <div className="col">
                    <label htmlFor="surname">Surname</label>
                      <input type="text" name="surname" id="surname" className="form-control" placeholder="Surname" value={this.state.surname} onChange={this.handleChange} required />
                    </div>
                  </div>
                </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className="form-control" id="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange} required/>

                </div>
                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="text" name="dob" className="form-control" id="dob" placeholder="Date of Birth" value={this.state.dob} onChange={this.handleChange} required/>

                </div>
                  <button type="submit" className="btn btn-light">Save details</button>
                </form><br />
                <button type="button" className="btn btn-outline-secondary" onClick={this.handleReset}>Reset Password</button><br /><br />
                <form id="editDetails" onSubmit={this.handlePreferences} method="post">
                <h3>Preferences</h3><hr />
                <div className="form-group">
                      <label htmlFor="firstname">Currency</label>
                      <input type="text" name="name" id="firstname" className="form-control" placeholder="First name" value={this.state.currency} onChange={this.handleChange} />
                    </div>
                
                <ThemeColor />
                <button type="submit" className="btn btn-light">Save Preferences</button>

                </form>
                
                <br /><br />
                <div className="column">
                  <button type="button" className="btn btn-outline-danger" onClick={this.handleClose}>Close account</button>
                  <small>This action is not reversible. All your data will be deleted.</small>
                </div>
            </div>
        </div>
      );
    }
  }