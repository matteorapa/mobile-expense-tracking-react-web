import React from 'react';
import './page.css';
import Sidebar from '../components/Sidebar';
import Signin from '../components/Signin';

export default class Welcome extends React.Component {
   
    constructor() {
        super();
    }

    componentDidMount() {
        
    }
    render() {
      return (
        <div className="main-container">
          
           <div className="wallpaper">
             <h1>Take control of your finances.</h1>
             {/* <button type="button" class="btn btn-outline-light btn-lg">Signup</button> */}
           </div>
           <div className="split">
              <div className="left"></div>
              <div className="right">
                <Signin />
              </div>  
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            
        
        </div>
        
      );
    }
  }