import React from 'react';
import {Link} from "react-router-dom";

import LoginControl from '../components/LoginControl';
import DarkMode from './DarkMode'

const Header = (props) => { 

      return (
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
              <Link to="/" className="navbar-brand" >MyVault</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link to="/vault" className="nav-link">My Expenses</Link>    
                  </li>

                  <li className="nav-item">
                    <Link to="/compare" className="nav-link">Analytics</Link>    
                  </li>
                  <li className="nav-item">
                    <Link to="/account" className="nav-link">My Account</Link>    
                  </li>
                  <li className="nav-item">
                    <DarkMode />
                  </li>

                </ul>

                <LoginControl />
                  
              
              </div>
          </nav>   
        </header>
      );
    
  }
  export default Header;