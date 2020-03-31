import React from 'react';
import './component.css';

export default class DarkMode extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            darkMode : false
        }
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }

    componentDidMount(){
        //api request to get the dark mode state, and set the state accordingly

        if(this.state.darkMode){
            this.dark();
        }else {
            this.light();
        }


    }

    toggleDarkMode(){  

        if(this.state.darkMode){
            //switch to light theme
            this.setState({
                darkMode : false
            });
            this.light();

            
        }else {
           //switch to dark theme
            this.setState({
                darkMode : true
            });
            this.dark();
        }
    
    }

    light(){

        document.body.style.setProperty('--background-color', 'rgb(255, 255, 255)');
        document.body.style.setProperty('--text-color', 'rgb(15, 15, 15)');
        document.body.style.setProperty('--light-color', 'rgba(197, 197, 197, 0.699)');
        document.body.style.setProperty('--dark-color', 'rgb(0, 0, 0)');
        document.body.style.setProperty('--shadow-color', 'rgb(204, 204, 204)');

    }

    dark(){

        document.body.style.setProperty('--background-color', 'rgb(25, 25, 28)');
        document.body.style.setProperty('--text-color', 'rgb(250, 250, 250)');
        document.body.style.setProperty('--light-color', 'rgba(255,255,255)');
        document.body.style.setProperty('--dark-color', 'rgb(0, 0, 0)');
        document.body.style.setProperty('--shadow-color', 'rgb(10, 10, 10)');

    }

    render() {

        if(this.state.darkMode){
            return (
                <button type="button" className="btn btn-dark side-margin" onClick={this.toggleDarkMode}>Dark Mode <i className="far fa-moon"></i></button>
              );
        }else {
            return (
                <button type="button" className="btn btn-light side-margin" onClick={this.toggleDarkMode}>Light Mode <i className="far fa-lightbulb"></i></button>
                
              );
        }

      
    }
  }