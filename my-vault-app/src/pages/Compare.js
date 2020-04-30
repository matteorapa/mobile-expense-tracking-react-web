import React from 'react';
import authentication from '../authentication';
import Header from '../components/Header';
import {Radar, Bar, Polar, Line } from 'react-chartjs-2';
import PieChart from '../components/PieChart';
import Stocks from '../components/Stocks'

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

      this.data = {
        labels: ['Food & beverage', 'Drinking', 'Entertainment', 'Shopping', 'Transport', 'Health', 'Utiities'],
        datasets: [
          {
            label: 'Your spending',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [50, 70, 90, 150, 80, 40, 100]
          },
          {
            label: '[18-24] Avg. spending',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [45, 50, 60, 80, 95, 55, 75]
          }
        ]
      };

      this.bar = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Spending over the past 6 months',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [165, 159, 180, 181, 156, 155, 140]
          }
        ]
      };

      this.polar = {
        datasets: [{
          data: [
            11,
            16,
            7,
            3,
            14
          ],
          backgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB'
          ],
          label: 'Spending by your top categories' // for legend
        }],
        labels: [
          'Shopping',
          'Transport',
          'Health',
          'Investments',
          'Food & beverage'
        ]
      };
    }
    

    render() {
      return (
        <div>
           <Header />
          <div className="main-container focused">
              <br /><br />
              <PieChart />
              <h1>Your monthly spending monthly</h1><br />
              <Bar data={this.bar} options={{ maintainAspectRatio: true }} height={60}/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <hr /><br /><br /><br />
              <h1>Your monthly spending by category</h1><br />
              <Polar data={this.polar} />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <hr /><br /><br /><br />
              <Radar data={this.data} />
              <br /><br /><br />
              <h2 className="center-box">You spent <strong className="theme-text">126%</strong> more on <u>Shopping</u> over the past month when compared with your age group.</h2>
              <br /><br />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <hr /><br /><br />
              <Stocks />
              <br /><br />
          </div>
        </div>
      );
    }
  }