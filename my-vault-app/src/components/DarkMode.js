import React from 'react';
<<<<<<< HEAD
import './component.css';
import authentication from '../authentication';
=======

>>>>>>> f33c6e5edb58017907ad98223a33259ccfd52663

export default class DarkMode extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            darkMode : 'white',
            themeColor : 'purple'
        }
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }

     async componentDidMount(){
        //api request to get the dark mode state, and set the state accordingly
        if(authentication.isAuthenticated()){
            await fetch('http://myvault.technology/api/pref', {
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
                    //console.log(response.output);
                    
                    this.setState(function() {
                        return {
                            themeColor: response.output[0].colour,
                            darkMode: response.output[0].dark
                        };
                      });
                }
                else {
                    console.log('There was an error loading theme settings from darkmode component');
                    console.log(response.output);
                }

            })

            .catch((error) => {
                console.log(error);
            });
        }
        

        if(this.state.darkMode === 'grey'){
            this.dark();
        }else {
            this.light();
        }

    }

    async updateTheme(cb) {

        await fetch('http://myvault.technology/api/pref', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authentication.token,
            },
            body: JSON.stringify({
                colour: this.state.themeColor,
                dark: this.state.darkMode,
            })
        })
      
            .then(response => (response.json()))
            .then((response) => {
      
                if (response.success) {
                  cb();
                }
                else {
                    console.log('Error when updating theme!')
                    
                }
            })
            .catch(error => console.log(error))
      
      }

    async toggleDarkMode(){  
        
        if(this.state.darkMode === 'grey'){
            this.setState(function() {
                return {
                  darkMode: 'white'
                };
              });
        }else {
            this.setState(function() {
                return {
                  darkMode: 'grey'
                };
              });
        }
      

        if(authentication.isAuthenticated()){
            await this.updateTheme(() => { 
                console.log('DarkMode switched successfully!')
                if(this.state.darkMode === 'grey'){
                    this.dark();
                }else {
                    this.light();
                }
              });
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

        document.body.style.setProperty('--background-color', 'rgb(35, 35, 38)');
        document.body.style.setProperty('--text-color', 'rgb(250, 250, 250)');
        document.body.style.setProperty('--light-color', 'rgba(255,255,255)');
        document.body.style.setProperty('--dark-color', 'rgb(0, 0, 0)');
        document.body.style.setProperty('--shadow-color', 'rgb(10, 10, 10)');

    }

    render() {
        if(authentication.isAuthenticated()){
            if(this.state.darkMode){
                return (
                    <button type="button" className="btn btn-dark side-margin" onClick={this.toggleDarkMode}>Dark Mode <i className="far fa-moon"></i></button>
                  );
            }else {
                return (
                    <button type="button" className="btn btn-light side-margin" onClick={this.toggleDarkMode}>Light Mode <i className="far fa-lightbulb"></i></button>
                    
                  );
            }
        }else {
            return ( <span></span>);
        }
        

      
    }
  }