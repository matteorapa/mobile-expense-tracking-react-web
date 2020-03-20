import React from 'react';
import './component.css';

export default class Sidebar extends React.Component {

  
    render() {
      return (
        <div className="sidebar">
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
        </div>
      );
    }
  }