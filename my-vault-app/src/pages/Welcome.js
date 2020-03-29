import React from 'react';
import './page.css';
import authentication from '../authentication';
import Signin from '../components/Signin';
import Header from '../components/Header';


export default class Welcome extends React.Component {
   
    constructor() {
        super();
        this.authenticateUser = this.authenticateUser.bind(this);
        
    }

    exitUser(){

      authentication.logout(() => {
        this.props.history.push('/')});
    
    }
    authenticateUser(email, password, cb){

        authentication.login(email, password, () => {
          this.props.history.push('/vault');

        });


        //login failed, go to callback
        if(!authentication.isAuthenticated){
          cb('my error');
        }
        
      
    }

    render() {
      return (
        <div>
          <Header exitUser={this.exitUser.bind(this)} />
          <div className="main-container">
            
            <div className="wallpaper">
              <h1>Take control of your finances.</h1>
              
            </div>
            <div className="split">
                <div className="left"></div>
                <div className="right">
                  <Signin authenticateUser={this.authenticateUser } />
                </div>  
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div>
        </div>
        
      );
    }
  }