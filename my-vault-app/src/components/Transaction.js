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
      currency: '€', //default currency
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
      let categoryIcon = "fas fa-random";
      let category = this.props.expense.expenseType;
      switch(this.props.expense.expenseType){
        case 'Groceries':
            categoryIcon = 'fas fa-shopping-basket'
          break;

          case 'Food':
            categoryIcon = 'fas fa-utensils'
          break;

          case 'Shopping':
            categoryIcon = 'fas fa-tshirt'
          break;

          case 'Travel':
            categoryIcon = 'fas fa-route'
          break;

          case 'Leisure':
            categoryIcon = 'far fa-smile-wink'
          break;

          case 'Health':
            categoryIcon = 'fas fa-heartbeat'
          break;

          case 'Home':
            categoryIcon = 'fas fa-home'
          break;

          case 'Tech':
            categoryIcon = 'fas fa-tv'
          break;

          case 'Utilities':
            categoryIcon = 'fas fa-hand-holding-water'
          break;

          case 'Bills':
            categoryIcon = 'fas fa-file-invoice'
          break;

          case 'Other':
            categoryIcon = 'fas fa-random'
          break;  

          default:
            categoryIcon = 'fas fa-random'
            break;
      }
      

      if(this.props.filter === 'none'){
          return (

            <div key={this.props.expense.expenseId} className="transaction expense" onClick={this.handleClick}>
              <span className="tr-options"><i className={categoryIcon} title={category}></i></span>
              <span className="tr-date">{this.state.localeDate}</span>
              <span className="tr-message">{this.props.expense.transactionTitle}</span>
              <span className="tr-amount">
                <span>{this.state.currency}</span>
                <span>{this.props.expense.expenseCost}</span>
                </span>
          </div>

        );

      }else{
          //display expense if matches filter
          if(this.props.expense.expenseType === this.props.filter){
              return (

                <div key={this.props.expense.expenseId} className="transaction expense" onClick={this.handleClick}>
                  <span className="tr-options"><i className={categoryIcon} title={category}></i></span>
                  <span className="tr-date">{this.state.localeDate}</span>
                  <span className="tr-message">{this.props.expense.transactionTitle}</span>
                  <span className="tr-amount">
                    <span>{this.state.currency}</span>
                    <span>{this.props.expense.expenseCost}</span>
                    </span>
              </div>
    
            );
          }else {
              return (

                <div key={this.props.expense.expenseId} className="expense-does-not-match-category"></div>
    
            );
          }
      }
      
    }
  }

  export default withRouter(Transaction);



