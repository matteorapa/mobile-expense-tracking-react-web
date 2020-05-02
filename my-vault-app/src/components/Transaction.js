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
      currency: '€',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let currency = this.props.expense.transactionCurrency;
    
    switch(currency){
      case 'usd':
        this.setState({
          currency: '$'
        });
        
        break;

      case 'eur':
        this.setState({
          currency: '€'
        });
        
          break;

      case 'gbp':
        this.setState({
          currency: '£'
        });
      
       
          break;
      default:
        this.setState({
          currency: '€'
        });
        

        break;
        
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  handleClick(){
    const {history} = this.props;
    history.push({
      pathname: '/expense',

      state: { expense: this.props.expense }
    });
  }


    render() {
      let symbol = '$';
      switch(this.props.expense.transactionCurrency){
        case "eur":
          symbol = '€';
          break;
        case "usd":
          symbol = '$';
          break;
        case "pnd":
          symbol = '£';
          break;

      }

      return (

          <div className="transaction expense" onClick={this.handleClick}>
            <span className="tr-options"><i className="fas fa-ellipsis-v"></i></span>
            <span className="tr-date">{this.state.localeDate}</span>
            <span className="tr-message">{this.props.expense.transactionTitle}</span>
            <span className="tr-amount">
              <span>{this.state.currency}</span>
              <span>{this.props.expense.expenseCost}</span>
              </span>
        </div>

      );
    }
  }

  export default withRouter(Transaction);



