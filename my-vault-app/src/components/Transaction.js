import React from 'react';

export default class Transaction extends React.Component {

    constructor() {
      super();
      this.state = {date: new Date()};
    }
  
    render() {
      return (
        <div>
         
          <h2>My Transaction happened on {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
