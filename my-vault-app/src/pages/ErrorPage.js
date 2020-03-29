import React from 'react';
import authentication from '../authentication';
import Header from '../components/Header';

export default class ErrorPage extends React.Component {
  

  exitUser(){

    authentication.logout(() => {
      this.props.history.push('/')});
  
  }
    render() {
      return (
        <div>
           <Header exitUser={this.exitUser.bind(this)} />
            <div className="main-container">
                <p className="text-danger text-center">404 Page not found.</p>
              
            </div>
        </div>
      );
    }
  }