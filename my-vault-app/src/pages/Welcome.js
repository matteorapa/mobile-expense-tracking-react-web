import React from 'react';
import './page.css';
import {Link} from "react-router-dom";
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

            <Link to="/addexpense">
                <div className="category-container neu">
                <i class="far fa-plus-square"></i>
                <span>Add your expenses</span>
              </div>
            </Link>

            <Link to="/periodic">
              <div className="category-container neu">
              <i class="far fa-calendar-plus"></i>
                <span>Manage your periodic expenses</span>
              </div>
            </Link> 
                
                
            </div>

            <div className="edge-row">
            <Link to="/compare">
            <div className="category-container neu">
                <i class="far fa-chart-bar"></i>
                <span>View your analytics</span>
              </div>
            </Link> 

            <Link to="/account">
            <div className="category-container neu">
                <i class="far fa-chart-bar"></i>
                <span>Manage your account</span>
              </div>
            </Link> 

            </div>

        
          </div>
        </div>
        
      );
    }
  }