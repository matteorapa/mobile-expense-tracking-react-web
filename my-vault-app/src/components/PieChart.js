import React from 'react';
import authentication from '../authentication'
import {Pie} from 'react-chartjs-2';


var pieNumbers = [];
var pieLabels = [];
var pieColors = [];

export default class PieChart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          pieData: []
        }
    }

     async componentDidMount() {
        await fetch('http://myvault.technology/api/analytics/CategoryTotalsEUR/y', {
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
                
                for (let i = 0; i < response.pieData.length; i++) {
                    
                    pieNumbers.push(parseInt(response.pieData[i].population));
                    pieLabels.push(response.pieData[i].name);
                    pieColors.push(response.pieData[i].color);
                    
                }

                  this.setState({
                    isLoading: false,
                    
                })
                
              }
              else {
                console.log('no data loaded')
              }
      
            })
            .catch((error) => {
              console.log(error);
            });
    }
  
    

    render() {
        
        this.data = {
            labels: pieLabels,
            datasets: [{
                data: pieNumbers,
                backgroundColor: pieColors,
                hoverBackgroundColor: pieColors
            }]
        };

        pieNumbers = [];
        pieLabels = [];
        pieColors = [];

        if(this.state.isLoading){
            return (
              <div className="loading">
              <div className="spinner-grow text-muted"></div>
          </div>
              );
        }else {
            return (
                <div className="chart">
                  <Pie data={this.data} />
              </div>
              );
              
        }

        
      
    }
  }