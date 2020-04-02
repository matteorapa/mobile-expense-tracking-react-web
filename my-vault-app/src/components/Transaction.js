import React from 'react';

export default class Transaction extends React.Component {
  constructor(props){
    super(props);
    let date = new Date(this.props.expense.transactionDate);
    date = date.toLocaleDateString();

    this.state = {
      localeDate: date
    }
  }
    render() {
      return (

        <div className="transaction expense" onClick={() => {this.props.view(this.props.expense)} }>
            <span className="tr-options"><i className="fas fa-ellipsis-v"></i></span>
            <span className="tr-date">{this.state.localeDate}</span>
            <span className="tr-message">{this.props.expense.transactionTitle}</span>
            <span className="tr-amount">{this.props.expense.expenseCost}</span>
        </div>

      );
    }
  }



