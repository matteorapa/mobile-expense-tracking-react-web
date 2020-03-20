import React from 'react';

export default class Account extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    
  }
    render() {
      return (
        <div className="main-container">
            <h2>Create an Account</h2>

            <input  type="text"/>
            <input  type="email"/>
            <input  type="password"/>
            
        </div>
      );
    }
  }