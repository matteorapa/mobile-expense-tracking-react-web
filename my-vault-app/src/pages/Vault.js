import React from 'react';
import './page.css';
import Sidebar from '../components/Sidebar';
import Transaction from '../components/Transaction';
import Header from '../components/Header';


export default class Vault extends React.Component {
   
  constructor() {
    super();
    this.view = this.view.bind(this);
  }

  componentDidMount() {
    fetch("https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=quote&range=1m&last=5&token=Tsk_1dc9a50b774c48a1935d075b55a7feeb")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            stock: result.AAPL
          });
          //console.log(this.state.stock);
        },

        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  view(){
    this.props.history.push('/expense');
  }

    render() {
      return (
        <div>
          <Header />
          <div className="main-container focused">
            <div className="container-block">

              <div className="content-block">
                <h2>My Expenses</h2>
                <button type="button" className="btn btn-light"><i className="fas fa-money-check"></i> Add transaction</button><br /><br />
                <div className="transactions">
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                  <Transaction  view={this.view} />
                </div>
                
                
              </div>

              <Sidebar />
            </div>
          </div>
        </div>
        
      );
    }
  }