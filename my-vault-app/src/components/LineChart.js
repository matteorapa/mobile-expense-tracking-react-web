

import React from 'react';
import authentication from '../authentication'
import {Line} from 'react-chartjs-2';


var temp = [0];
export default class LineChart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
        }
    }

    async componentDidMount() {
        await fetch('https://myvault.technology/api/analytics/MonthlyTotals', {
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
                for (let i = 0; i < 12; i++) {
                  temp.push(parseInt(response.datasets[i].data));
                }

              this.setState({
                isLoading: false,
              })  

              console.log('chart data loaded!')
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
                label: 'Your expenses by month',
                fill: false,
                lineTension: 0.25,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: temp
              }
            ]
          };

        if(this.state.isLoading){
            return (
              <div className="loading">
              <div className="spinner-grow text-muted"></div>
          </div>
              );
        }else {
            return (
                <div className="chart">
                  <Line data={this.data} />
              </div>
              );
        }
      
    }
  }