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
    
            {/* <h3>Stocks</h3>
            <small className="text-muted"><a href="https://iexcloud.io">Data provided by IEX Cloud</a></small> */}

            
           
           
    
        </aside>
        
           
       
      );
    }
  }