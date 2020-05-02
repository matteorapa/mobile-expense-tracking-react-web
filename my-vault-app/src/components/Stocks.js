import React from 'react';


export default class Stocks extends React.Component {

  componentDidMount() {
    fetch("https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=quote&range=1m&last=5&token=Tsk_1dc9a50b774c48a1935d075b55a7feeb")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            stock: result
          });
          console.log(this.state.stock);
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }
    render() {
      return (
        <aside className="sidebar">
    
            <h3>Stocks</h3>
           <div className="stocks">
                <div className="stock">
                    <span className="symbol">AAPL</span>
                    <span className="company">Apple Inc.</span>
                    <span className="change negative">-6.3%</span>
                </div>
                <div className="stock">
                    <span className="symbol">FB</span>
                    <span className="company">Facebook.</span>
                    <span className="change negative">-3.5%</span>
                </div>
                <div className="stock">
                    <span className="symbol">TSLA</span>
                    <span className="company">Tesla Inc.</span>
                    <span className="change positive">2.7%</span>
                </div>
                <div className="stock">
                    <span className="symbol">VOW3</span>
                    <span className="company">Volkswagen AG.</span>
                    <span className="change negative">-1.2%</span>
                </div>
           </div>
           
    
        </aside>
        
           
       
      );
    }
  }