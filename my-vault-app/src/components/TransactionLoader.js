import React from 'react';
import Transaction from './Transaction';
import authentication from '../authentication';


export default class TransactionLoader extends React.Component {
  

    constructor(props) {
      super(props);
      this.state = {
        call: 'http://myvault.technology/api/expenses/',
        isLoading: false,
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
        console.log(data);
        // let result = [{desc:"Hot Dogs",amount:"8",date:"03/02/2020"},
        //                 {desc:"Apple Store",amount:"895",date:"25/02/2020"}]

       
        let transactions = data.map((e) => {return (<Transaction  view={this.props.view}  expense={e} /> )} ); 
            
            


        if(this.state.isLoading){
            return (
                <div className="loading">
                    <div className="spinner-grow text-muted"></div>
                </div>
        
              );
        }else{
            return (

                <div className="transactions">
                         {transactions}         
                </div>
        
              );

        }
    }
  }
