import React from 'react';
import Transaction from './Transaction';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import authentication from '../authentication';
import {Link} from "react-router-dom";


class TransactionLoader extends React.Component {
  

    constructor(props) {
      super(props);
      this.state = {
        call: 'http://myvault.technology/api/expenses/',
        isLoading: true,
        dataSource : []
      }
      this.addTransaction = this.addTransaction.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getAllExpenses = this.getAllExpenses.bind(this);
      
    }

    static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };
 
    componentDidMount() {
      
        fetch(this.state.call, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authentication.token,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              this.setState({
                isLoading: false,
                dataSource: response.output
              });
      
            }
            else {
              console.log('Failed to load transactions');
            
            }
    
          })
          .catch((error) => {
            console.log(error);
          });
      }

    async addTransaction(event){

      console.log('add transaction mathod called');
      await fetch('http://myvault.technology/api/expenses', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authentication.token,
        },
        body: JSON.stringify({
            title: this.state.title,
            category: this.state.category,
            amount: this.state.amount,
            cashCard: this.state.cashCard,
            currency: this.state.currency,
            onlineSwitch: this.state.onlineSwitch,
        })
    })


        .then(response => (response.json()))
        .then((response) => {

            if (response.success) {
                console.log('Added transaction successfully!');
                this.componentDidMount();
            }
            else {
                console.log('Something went wrong!')
                console.log(response)
                
            }
        })
        .catch(error => console.warn(error))
    }

    getAllExpenses() {
        this.setState({
          call: 'http://myvault.technology/api/expenses/'
        });
        
        this.componentDidMount();
    
      }
    
      getWeekExpenses() {
       
        this.setState({
          call: 'http://myvault.technology/api/expensesw/w'
        });
        
        this.componentDidMount();
    
      }
      getMonthExpenses() {
        this.setState({
          call: 'http://myvault.technology/api/expenses/m'
        });
        
        this.componentDidMount();
    
      }
    
      getYearExpenses() {
        this.setState({
          call: 'http://myvault.technology/api/expenses/y'
        });
        
        this.componentDidMount();
    
      }

      handleChange(event){
        switch(event.target.value){
          case '1':
            this.getAllExpenses();
            break;
          case '2':
            this.getWeekExpenses();
            break;
          case '3':
            this.getMonthExpenses();
            break;
          case '4':
           this.getYearExpenses();
            break;

            default:
              break;
        }
      }
  
    render() {

        const {history} = this.props;

        let data = this.state.dataSource;
        let transactions = data.map((e) => {return (<Transaction   expense={e} /> )} ); 
            

        if(this.state.isLoading){
            return (
                <div className="loading">
                    <div className="spinner-grow text-muted"></div>
                </div>
        
              );
        }else{
            return (
              <div>
                  <div className="form-row fix-row">
                      <select id="filters" className="custom-select col-7" defaultValue="1" onChange={this.handleChange}>
                        <option value="1">Recent</option>
                        <option value="2">Weekly</option>
                        <option value="3">Monthly</option>
                        <option value="4">Yearly</option>
                      </select>

                      <Link to="/addexpense"><button type="button" className="btn btn-light col"><i className="fas fa-money-check" ></i> Add transaction</button></Link><br /><br />
                  </div><br />   
                  <div className="transactions">
                          {transactions}         
                  </div>
                </div>
        
              );
        }
    }
  }

  export default withRouter(TransactionLoader);
