import React from 'react';
import Header from '../components/Header';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

export default class Compare extends React.Component {
  
  
    constructor(props){
      super(props);
      this.state = {
        isLoading: true,
        pieData: [],
        lineData: [],
        barData: [],
        array: [],
        BarArray: [],
        isClicked: 'all'
      }
    }

    
        
    

    render() {
      return (
        <div>
           <Header />
          <div className="main-container focused">
              

              <h2>Your spending by period and currency</h2><br />
              <PieChart />
              <hr /><br />

              <h2>Your monthly spending over the past year</h2><br />
              <BarChart/><br />
          </div>
        </div>
      );
    }
  }