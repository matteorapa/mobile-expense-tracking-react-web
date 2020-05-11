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
          pieData: [],
        }

        this.currency = 'EUR'
        this.duration = '/a'

        this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
        this.handleChangeDuration = this.handleChangeDuration.bind(this)
        this.handleApply = this.handleApply.bind(this)
    }

     async componentDidMount() {
        await fetch('http://myvault.technology/api/analytics/CategoryTotals' + this.currency + this.duration, {
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
  
    handleChangeDuration(event, type){

      

      this.duration = type
      

      let b1 = document.getElementById('/a');
      b1.style.borderColor = 'rgba(0,0,0,0.3)';

      let b2 = document.getElementById('/w');
      b2.style.borderColor = 'rgba(0,0,0,0.3)';

      let b3 = document.getElementById('/m');
      b3.style.borderColor = 'rgba(0,0,0,0.3)';

      let b4 = document.getElementById('/y');
      b4.style.borderColor = 'rgba(0,0,0,0.3)';

      let pressed = document.getElementById(type);
      pressed.style.borderColor = 'var(--theme-color)';
    }

    handleChangeCurrency(event, type){

     

      this.currency = type

      let b1 = document.getElementById('EUR');
      b1.style.borderColor = 'rgba(0,0,0,0.3)';

      let b2 = document.getElementById('GBP');
      b2.style.borderColor = 'rgba(0,0,0,0.3)';

      let b3 = document.getElementById('USD');
      b3.style.borderColor = 'rgba(0,0,0,0.3)';

     

      let pressed = document.getElementById(type);
      pressed.style.borderColor = 'var(--theme-color)';
    }

    handleApply(event){
      this.componentDidMount();
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
                  <div className="button-row">
                    <div className="btn-group function" role="group" aria-label="Piechart Duration filters">
                        <div type="div" id="/a" className="btn btn-outline-secondary" onClick={() => this.handleChangeDuration(this, '/a')}>All</div>
                        <div type="div" id="/w" className="btn btn-outline-secondary" onClick={() => this.handleChangeDuration(this, '/w')} >Weekly</div>
                        <div type="div" id="/m" className="btn btn-outline-secondary" onClick={() => this.handleChangeDuration(this, '/m')} >Monthly</div>
                        <div type="div" id="/y" className="btn btn-outline-secondary" onClick={() => this.handleChangeDuration(this, '/y')} >Yearly</div>
                        
                  
                    </div>
                    <div className="btn-group function" role="group" aria-label="Piechart Currency filters">
                        
                        <div type="div" id="EUR" className="btn btn-outline-secondary" onClick={() => this.handleChangeCurrency(this, 'EUR')}>EUR</div>
                        <div type="div" id="GBP" className="btn btn-outline-secondary" onClick={() => this.handleChangeCurrency(this, 'GBP')} >GBP</div>
                        <div type="div" id="USD" className="btn btn-outline-secondary" onClick={() => this.handleChangeCurrency(this, 'USD')} >USD</div>
                  
                    </div>
                    
                    <button type="button" className="btn btn-outline-primary function" onClick={this.handleApply} >Apply</button>

                  </div>
                  
                  

                  <div className="btn-group" role="group" aria-label="Currency filters">
                      
                  </div>

                  <Pie data={this.data} height={80}/>
              </div>
              );
              
        }

        
      
    }
  }