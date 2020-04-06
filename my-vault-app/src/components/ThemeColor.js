import React from 'react';


export default class ThemeColor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color : "#ff0000",
            selectedColor: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    
    componentDidMount(){
        //api request to get the theme color state, and set the state accordingly

        let userColor = '#ff0000'
        this.setState({
            color: userColor,
            selectedColor: userColor
        });
        
    }

    

    handleChange(event){
        console.log('Handled color '+event.target.value);
        if(event.target.name === 'color') {
              this.setState({
                    selectedColor: event.target.value
                    
              });
        }
    }

    handleSubmit(event){
        event.preventDefault();

        this.setState({
            color: this.state.selectedColor
        });

        //send post request to api to update color in db

        document.body.style.setProperty('--theme-color', this.state.color);
        
      }
  
    render() {
      return (
            <div className="form-group">
                      <label htmlFor="firstname">Theme Color</label><br />
                      <input type="color" className="color-picker" id="themecolor" name="color" value={this.state.selectedColor}  onChange={this.handleChange} required/>
            </div>

      );
    }
  }