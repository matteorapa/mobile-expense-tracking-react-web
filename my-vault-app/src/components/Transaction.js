import React from 'react';

export default class Transaction extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        type: props.type,
        date: props.date,
        message: props.message,
        amount: props.amount
      };
    }
  
    render() {
      return (
        <li className={this.state.type}>
          <div className="tr-options">
            <i className="far fa-trash-alt"></i>
          </div>
          
          <span className="tr-date">{this.state.date}</span>
          <span className="tr-message">{this.state.message}</span>
          <span className="tr-amount">${this.state.amount}</span>           
        </li>
      );
    }
  }



