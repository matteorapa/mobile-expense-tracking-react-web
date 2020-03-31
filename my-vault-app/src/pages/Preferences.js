import React from 'react';
import authentication from '../authentication';
import Header from '../components/Header';
import ThemeColor from '../components/ThemeColor'
import DarkMode from '../components/DarkMode'

export default class Preferences extends React.Component {
  

  exitUser(){

    authentication.logout(() => {
      this.props.history.push('/')});
  
  }
    render() {
      return (
        <div>
           <Header exitUser={this.exitUser.bind(this)} />
            <div className="main-container focused">
                <p className="text-center">Preferences</p>

                <h3>Personal Details</h3>
                
                <div>Default currency</div>
                <ThemeColor />

                <div>Close account</div>
                <small>This action is not reversible. All your data will be deleted.</small>

                


            </div>
        </div>
      );
    }
  }