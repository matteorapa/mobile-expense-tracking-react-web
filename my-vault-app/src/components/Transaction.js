import React from 'react';

export default class Transaction extends React.Component {
  
    render() {
      return (

        <div className="transaction expense" onClick={() => {this.props.view(this.props.expense)} }>
            <span className="tr-options"><i className="fas fa-ellipsis-v"></i></span>
            <span className="tr-date">{this.props.expense.date}</span>
            <span className="tr-message">{this.props.expense.desc}</span>
            <span className="tr-amount">{this.props.expense.amount}</span>
        </div>

      );
    }
  }



