import React from 'react';
import authentication from '../authentication';
import Header from '../components/Header';
export default class Compare extends React.Component {
  
  exitUser(){

    authentication.logout(() => {
      this.props.history.push('/')});
  
  }
    render() {
      return (
        <div>
           <Header exitUser={this.exitUser.bind(this)} />
          <div className="main-container">
              <span><strong>Compare Page</strong></span>
          </div>
        </div>
      );
    }
  }