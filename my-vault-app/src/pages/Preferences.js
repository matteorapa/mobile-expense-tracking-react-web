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

    this.state = {
        name: 'Matteo',
        surname: 'Rapa',
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
                    this.setState({
                        isLoading: false,
                        dataSource: response.output,
                    })
                    console.log(response.output);
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
  
  }

  handleSubmit(event) {
    
  }

  async updateDetails(){
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
                    
                }
                else {
                    
                }
            })
            .catch(error => console.warn(error))
  }

    render() {
      return (
        <div>
           <Header />
            <div className="main-container focused">
                <h2 className="text-center">My Account</h2>

                
                <form id="editDetails" onSubmit={this.handleSubmit} method="post">
                <h3>Personal</h3><hr />
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
                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" name="dob" className="form-control" id="dob" placeholder="Enter email" value={this.state.dob} onChange={this.handleChange} />

                </div>

                  
                  <button type="submit" className="btn btn-light">Save details</button>
                </form>

                
                <br /><br />
                <form id="editDetails" onSubmit={this.handleSubmit} method="post">
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
                  <button type="button" className="btn btn-danger">Close account</button>
                  <small>This action is not reversible. All your data will be deleted.</small>
                </div>
                


            </div>
        </div>
      );
    }
  }