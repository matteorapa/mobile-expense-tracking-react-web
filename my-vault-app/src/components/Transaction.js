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

        <div className="transaction expense" onClick={this.props.view}>
            <div className="tr-options">
              <i className="far fa-trash-alt"></i>
            </div>
            <span className="tr-date">03/05/2020</span>
            <span className="tr-message">Apple Store</span>
            <span className="tr-amount">$899</span>
        </div>

      );
    }
  }



