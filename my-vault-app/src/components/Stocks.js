import React from 'react';


export default class Stocks extends React.Component {

  componentDidMount() {
    //https://cloud.iexapis.com/stable/stock/market/batch?symbols=aapl,fb,t,v,amzn,goog,msft,nflx,mcd,pypl,uber,nsdq100,spx500,dj30&types=quote,news,chart&range=1m&last=5&token=pk_54fb05aeb2894021ab4e839ae2de6cb7
    // fetch("https://cloud.iexapis.com/stable/stock/market/batch?symbols=btc,nsdq100,spx500,dj30&types=quote,news,chart&range=1m&last=5&token=pk_54fb05aeb2894021ab4e839ae2de6cb7")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         stock: result
    //       });
    //       console.log(this.state.stock);
    //     },

    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )

  }
    render() {
      return (
        <aside className="sidebar">
    
            <h3>Stocks</h3>
            <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
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