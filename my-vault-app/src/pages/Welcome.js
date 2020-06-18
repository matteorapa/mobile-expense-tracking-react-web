import React from 'react';
import './page.css';
import Signin from '../components/Signin';
import Header from '../components/Header';


export default class Welcome extends React.Component {

    render() {
      return (
        <div>
          <Header />
          <div className="main-container focused">
            
            
            <div className="right">
              <Signin />
            </div>  
            <br />
            
            <div> 
              <h5>MyVault</h5>
              <h1>The expense tracking application you need.</h1>
            </div>
            
            <div className="edge-row">

              
                <div className="category-container neu">
                <i class="far fa-plus-square"></i>
                <span>Add your expenses</span>
              </div>

              <div className="category-container neu">
              <i class="far fa-calendar-plus"></i>
                <span>Manage your periodic expenses</span>
              </div>
                
                
                <div className="category-container neu">
                <i class="far fa-chart-bar"></i>
                <span>View your analytics</span>
              </div>
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div>
        </div>
        
      );
    }
  }