import React from 'react';
import Transaction from './Transaction';
import authentication from '../authentication';


export default class TransactionLoader extends React.Component {
  

    constructor(props) {
      super(props);
      this.state = {
        call: 'http://myvault.technology/api/expenses/',
        isLoading: true,
        dataSource : []
      }
      
    }

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
              //error loading
              console.log('error loading');
              console.log(authentication.token);

            }
    
          })
          .catch((error) => {
            console.log(error);
          });
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
  
    render() {

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
                  <div className="expense-filters">
                      <span><i className="fas fa-funnel-dollar padding-icon"></i></span>
                      <div className="btn-group btn-group-toggle" data-toggle="buttons">
                          <label className="btn btn-secondary active"> 
                            <input type="radio" name="options" id="option1" /> Recent
                          </label>

                          <label className="btn btn-secondary">
                            <input type="radio" name="options" id="option2" /> Weekly
                          </label>

                          <label className="btn btn-secondary">
                            <input type="radio" name="options" id="option3" /> Monthly
                          </label>

                          <label className="btn btn-secondary">
                            <input type="radio" name="options" id="option3" /> Yearly
                          </label>
                    </div>

                  </div>      
                  <div className="transactions">
                          {transactions}         
                  </div>
                </div>
        
              );

        }
    }
  }
