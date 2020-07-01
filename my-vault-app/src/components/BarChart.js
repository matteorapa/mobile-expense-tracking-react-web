

import React from 'react';
import authentication from '../authentication'
import {Bar} from 'react-chartjs-2';


var temp = [0];
export default class BarChart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          themeColor: '#707070',
        }
    }

    async componentDidMount() {
      if(authentication.isAuthenticated()){
        await fetch('https://myvault.technology/api/pref', {
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
                
                this.setState(function() {
                    return {
                        themeColor: response.output[0].colour
                    };
                  });
                  console.log('Setting theme color success!');

                  
            }
            else {
                console.log('There was an error loading theme settings from barchart component');
                console.log(response.output);
            }

        })

        .catch((error) => {
            console.log(error);
        });
    }

        await fetch('https://myvault.technology/api/analytics/MonthlyTotalsEUR', {
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
                backgroundColor: this.state.themeColor,
                borderColor: this.state.themeColor,
                borderWidth: 1,
                hoverBackgroundColor: this.state.themeColor,
                hoverBorderColor: this.state.themeColor,
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