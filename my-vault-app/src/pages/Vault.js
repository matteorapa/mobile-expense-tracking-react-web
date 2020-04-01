import React from 'react';
import './page.css';
import Sidebar from '../components/Sidebar';
import TransactionLoader from '../components/TransactionLoader';
import Header from '../components/Header';


export default class Vault extends React.Component {
   
  constructor() {
    super();
    this.view = this.view.bind(this);
  }

  componentDidMount() {
    // fetch("https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=quote&range=1m&last=5&token=Tsk_1dc9a50b774c48a1935d075b55a7feeb")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         stock: result.AAPL
    //       });
    //       //console.log(this.state.stock);
    //     },

    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )

  }


  view(expense){
    this.props.history.push({
        pathname: '/expense',
        state: { expense: expense }
      });

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
                

                <TransactionLoader  view={this.view}/>
                
                
                
              </div>

              <Sidebar />
            </div>
          </div>
        </div>
        
      );
    }
  }