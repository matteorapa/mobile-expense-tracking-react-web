

import React from 'react';
import authentication from '../authentication'
import {Bar} from 'react-chartjs-2';


var temp = [0];
export default class BarChart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
        }
    }

    async componentDidMount() {
        await fetch('http://myvault.technology/api/analytics/MonthlyTotalsEUR', {
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

              
                for (let i = 0; i < response.datasets.length; i++) {
                  temp.push(parseInt(response.datasets[i].data));
                }

              this.setState({
                isLoading: false,
              }) 
            }
    
            else {
              console.log('there was an error loading charts')
            }
    
          })
          .catch((error) => {
            console.log(error);
          });

    }
  
    

    render() {

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' ,'September', 'October', 'November', 'December'],
            datasets: [
              {
                label: 'Spending over the past 12 months',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: temp
              }
            ]
          };

        

          temp = [0];

          if(this.state.isLoading){
            return (
              <div className="loading">
              <div className="spinner-grow text-muted"></div>
          </div>
              );
        }else {
              return (
                  <div className="chart">
                    <Bar data={this.data} height={80} />
                </div>
                );

              }

          
        
      
    }
  }