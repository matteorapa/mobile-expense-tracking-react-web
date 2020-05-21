import React from 'react';
import Transaction from './Transaction';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import authentication from '../authentication';
import {Link} from "react-router-dom";
import BarChart from './BarChart';
import {getCategoryIcon} from '../global';

class TransactionLoader extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        call: 'https://myvault.technology/api/expenses/',
        isLoading: true,
        dataSource : [],
        filter: "none",
      }
      this.addTransaction = this.addTransaction.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleFilter = this.handleFilter.bind(this);
      
    }

    static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };
 
    componentDidMount(type) {
      const {location} = this.props;
         console.log(location);
      if(type){ //check if type is being passed
        switch(type){
          case 'all': 
          type = 'https://myvault.technology/api/expenses/'
          break;

          case 'weekly': 
          type = 'https://myvault.technology/api/expenses/w'
          break;

          case 'monthly': 
          type = 'https://myvault.technology/api/expenses/m'
          break;

          case 'yearly': 
          type = 'https://myvault.technology/api/expenses/y'
          break;
          default:
            type = 'https://myvault.technology/api/expenses/'
            break;
        }

      }else{
        type = 'https://myvault.technology/api/expenses/'
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
      await fetch('https://myvault.technology/api/expenses', {
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

    handleFilter(event, category){
        this.setState({
          filter: category,
        });
        //this.componentDidMount();
        this.forceUpdate()
    }
  
    render() {

        

        let data = this.state.dataSource;
        let transactions = data.map((e) => {return (<Transaction key={e.expenseId} expense={e} filter={this.state.filter}/> )} ); 

        let  currentFilter = "Filter";
        let categoryIcon = "fas fa-funnel-dollar";
        if(this.state.filter === "none"){
          currentFilter = "Filter";
          categoryIcon = "fas fa-funnel-dollar";
        }else {
          currentFilter = this.state.filter;
          categoryIcon = getCategoryIcon(this.state.filter);
          
        }


        if(this.state.isLoading){
            return (
                <div className="loading">
                    <div className="spinner-grow text-muted"></div>
                </div>
        
              );
        }else{
            return (
              <div>
                  <BarChart />
                
                  <div className="button-row">

                      <div className="btn-group function" role="group" aria-label="Expenses filters">
                        <button type="button" id="all" className="btn btn-outline-secondary" onClick={() => this.handleChange(this, 'all')}>All</button>
                        <button type="button" id="weekly" className="btn btn-outline-secondary" onClick={() => this.handleChange(this, 'weekly')} >Weekly</button>
                        <button type="button" id="monthly" className="btn btn-outline-secondary" onClick={() => this.handleChange(this, 'monthly')} >Monthly</button>
                        <button type="button" id="yearly" className="btn btn-outline-secondary" onClick={() => this.handleChange(this, 'yearly')} >Yearly</button>
                      </div>
                      
                          <div className="dropdown function">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownFilters" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className={categoryIcon}></i> {currentFilter}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownFilters">
                        <div className="dropdown-category" onClick={() => this.handleFilter(this, 'none')}>All categories <sup>(Default)</sup></div>

                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Groceries')}><i className="fas fa-shopping-basket"></i> Groceries</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Food')}><i className="fas fa-utensils"></i> Food</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Shopping')}><i className="fas fa-tshirt"></i> Shopping</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Travel')}><i className="fas fa-route"></i> Travel</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Leisure')}><i className="far fa-smile-wink"></i> Leisure</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Health')}><i className="fas fa-heartbeat"></i> Health</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Home')}><i className="fas fa-home"></i> Home</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Tech')}><i className="fas fa-tv"></i> Tech</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Utilities')}><i className="fas fa-hand-holding-water"></i> Utilities</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Bills')}><i className="fas fa-file-invoice"></i> Bills</div>
                          <div className="dropdown-category" onClick={() => this.handleFilter(this, 'Other')}><i className="fas fa-random"></i> Other</div>
                        </div>
                          </div>
                          <Link to="/periodic" className="btn btn-outline-secondary btn-block function">Periodic</Link>
                      </div>
                      <Link to="/addexpense" type="button" className="btn btn-outline-primary btn-block function"><i className="fas fa-plus"></i> Add expense</Link>
                      
                  <br />   
                  <div className="transactions">
                          {transactions}         
                  </div>
                </div>
        
              );
        }
    }
  }

  export default withRouter(TransactionLoader);
