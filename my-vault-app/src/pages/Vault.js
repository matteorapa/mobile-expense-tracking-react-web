import React from 'react';
import './page.css';
import TransactionLoader from '../components/TransactionLoader';
import Header from '../components/Header';


export default class Vault extends React.Component {
  constructor(props){
    super(props)
    
      this.state = {
        message: this.props.location.search
      }
   
    
  }
  
  
    render() {
      return (
        <div>
          <Header />
          <div className="main-container focused">
            {/* <div className="container-block"> */}
            <span className="text-success">{this.state.message}</span>
              <div className="content-block">
                <h2>My Expenses</h2>
                

                <TransactionLoader />          
              </div>

          </div>
        </div>
        
      );
    }
  }