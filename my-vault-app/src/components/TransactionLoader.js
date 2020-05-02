import React from 'react';
import Transaction from './Transaction';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import authentication from '../authentication';
import {Link} from "react-router-dom";
import BarChart from './BarChart';
import PieChart from './PieChart';


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
      
    }

    static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };
 
    componentDidMount(type) {

      if(type){
        switch(type){
          case 'all': 
          type = 'http://myvault.technology/api/expenses/'
          break;

          case 'weekly': 
          type = 'http://myvault.technology/api/expenses/w'
          break;

          case 'monthly': 
          type = 'http://myvault.technology/api/expenses/m'
          break;

          case 'yearly': 
          type = 'http://myvault.technology/api/expenses/y'
          break;
        }

      }else{
        type = 'http://myvault.technology/api/expenses/'
      }
      
        fetch(type, {
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


      handleChange(event, type){
        this.componentDidMount(type);

        let b1 = document.getElementById('all');
        b1.style.borderColor = 'unset';

        let b2 = document.getElementById('weekly');
        b2.style.borderColor = 'unset';

        let b3 = document.getElementById('monthly');
        b3.style.borderColor = 'unset';

        let b4 = document.getElementById('yearly');
        b4.style.borderColor = 'unset';

        let pressed = document.getElementById(type);
        pressed.style.borderColor = 'var(--theme-color)';
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
                  <div className="row">
                      <BarChart />
                      <PieChart />
                  </div>
                  <div className="side-row">

                      <div class="btn-group" role="group" aria-label="Expenses filters">
                        <button type="button" id="all" className="btn btn-light filter" onClick={() => this.handleChange(this, 'all')}>All</button>
                        <button type="button" id="weekly" className="btn btn-light filter" onClick={() => this.handleChange(this, 'weekly')} >Weekly</button>
                        <button type="button" id="monthly" className="btn btn-light filter" onClick={() => this.handleChange(this, 'monthly')} >Monthly</button>
                        <button type="button" id="yearly" className="btn btn-light filter" onClick={() => this.handleChange(this, 'yearly')} >Yearly</button>
                      </div>

                      <Link to="/addexpense"><button type="button" className="btn btn-light col side-margin"><i className="fas fa-plus"></i> Add expense</button></Link><br /><br />
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
