import React from 'react';
import authentication from '../authentication';
import Header from '../components/Header';
import './page.css';
import DarkMode from '../components/DarkMode';

export default class Preferences extends React.Component {
  
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleThemeSubmit = this.handleThemeSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseAccount = this.handleCloseAccount.bind(this);
    this.state = {
      name: '', surname: '', currency: '$', dob: '', message: '', error: '', color: '#000000', dark: 'white'
  }
    
  }

  componentDidMount() {
    fetch('https://myvault.technology/api/users/details', {
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

              let date = response.output[0].dob.substr(0,10);
              // date.toISOString();
              

                this.setState({
                    isLoading: false,
                    name: response.output[0].name,
                    surname: response.output[0].surname,
                    email: response.output[0].email,
                    dob: date
                })

            }
            else {
               console.log('error loading account details')
               this.setState({
                 error: 'Error loading account details, please try again.'
               });
            }

        })
        .catch((error) => {
            console.log(error);
        });

        fetch('https://myvault.technology/api/pref', {
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
                    console.log(response.output);
                    this.setState({
                        color: response.output[0].colour,
                        dark: response.output[0].dark,

                    })
                   
                }
                else {
                    console.log('there was an error loading theme settings');
                    console.log(response.output);
                }

            })

            .catch((error) => {
                console.log(error);
            });
}

async updateAccount(cb) {

  await fetch('https://myvault.technology/api/users/update', {
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
              console.log('Successfully updated account details!')
              cb();
          }
          else {
            console.log('Error has occured whilst updating account details!')
          }
      })
      .catch(error => console.warn(error))
      
}

async updateTheme(cb) {

  await fetch('https://myvault.technology/api/pref', {
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
            cb();
          }
          else {
              console.log('Error when updating theme!')
              
          }
      })
      .catch(error => console.warn(error))

}

  handleChange(event) {  
    switch (event.target.name) {
      case 'email':
        this.setState({
          email: event.target.value
        });
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
      case 'color':
        this.setState({
          color: event.target.value
          
        });
        break;
      default:
        break;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    let error = true;
    await this.updateAccount(() => { 
      this.setState({
        message: 'Account details updated successfully!'
      })
      error = false;
      
    });
    if(error){
      this.setState({
        error: 'Error occured whilst updating account details.'
      })
    }
    
  }

  async handleThemeSubmit(event){
    event.preventDefault();
    let error = true;
    await this.updateTheme(() => { 
      this.setState({
        message: 'Theme updated successfully!'
      })
      error = false;

      //update theme color in css
      document.body.style.setProperty('--theme-color', this.state.color);
    });
    if(error){
      this.setState({
        error: 'Error occured whilst updating theme.'
      })
    }

  }

  handleModal(event){
    var modal = document.getElementById("confirmClose");
    modal.style.display = "block";  
    
  }

  handleCloseModal(event){
    var modal = document.getElementById("confirmClose");
    modal.style.display = "none";
  }

  handleCloseAccount(event){
    fetch('https://myvault.technology/api/users', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + authentication.token,
            }
        })
            .then(response =>
                response.json().then(json => {
                  const {history} = this.props;
                  authentication.logout(() => { history.push('/') });
                  
                    return json;
                })
            )
            .catch(error => console.warn(error))
            
  }

  render() {
      return (
        <div>
           <Header />
            <div className="main-container focused">
                <span>
                  <span className="text-success">{this.state.message}</span>
                  <span className="text-danger">{this.state.error}</span>
                </span>
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
                      <input type="text" name="surname" id="surname" className="form-control" placeholder="Last name" value={this.state.surname} onChange={this.handleChange} required/>
                    </div>
                  </div>
                </div>

                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" name="dob" className="form-control" id="dob" placeholder="2000/01/28" value={this.state.dob} onChange={this.handleChange} required/>

                </div>
                <div className="form-group">
                    <label htmlFor="dob">Email Address</label>
                    <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required/>

                </div>
                
                  <button type="submit" className="btn btn-outline-success">Save details</button>
                </form>

                
                <br /><br />
                <form id="editDetails" onSubmit={this.handleThemeSubmit} method="post">
                  <h3>Preferences</h3><hr />
                  <DarkMode /><br /><br />
                  
                  <div className="form-group">
                        <label htmlFor="firstname">Theme Color <small>{this.state.color}</small></label><br />
                        <input type="color" className="color-picker" id="themecolor" name="color" value={this.state.color}  onChange={this.handleChange} required/>
                  </div>
                  <button type="submit" className="btn btn-outline-success">Save Preferences</button>

                </form>
                
                <br /><br />
                <div className="column">
                  <button type="button" className="btn btn-outline-danger" onClick={this.handleModal}>Close account</button>
                  <small>This action is not reversible. All your data will be deleted.</small>
                   
                  <div className="modal" id="confirmClose">
                    <div className="modal-content">
                      <span className="close" onClick={this.handleCloseModal}>&times;</span>
                      <p>Are you sure you want to close your account?</p>
                       <button type="button" className="btn btn-danger" onClick={this.handleCloseAccount}>Close account</button>
                        
                    </div>
                  </div>

                </div>
            </div>
        </div>
      );
    }
  }