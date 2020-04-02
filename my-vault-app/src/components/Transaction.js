import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class Transaction extends React.Component {
  constructor(props){
    
    super(props);
    let date = new Date(this.props.expense.transactionDate);
    date = date.toLocaleDateString();

    this.state = {
      localeDate: date,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  handleClick(expense){
   
    const {history} = this.props;
    history.push({
      pathname: '/expense',
      state: { expense: this.props.expense }
    });
  }


    render() {

      return (

          <div className="transaction expense" onClick={this.handleClick}>
            <span className="tr-options"><i className="fas fa-ellipsis-v"></i></span>
            <span className="tr-date">{this.state.localeDate}</span>
            <span className="tr-message">{this.props.expense.transactionTitle}</span>
            <span className="tr-amount">{this.props.expense.expenseCost}</span>
        </div>

      );
    }
  }

  export default withRouter(Transaction);



