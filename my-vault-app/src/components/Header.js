import React from 'react';
import {Link} from "react-router-dom";
import './component.css';

export default class Header extends React.Component {

  
    render() {
      return (
        <header>
          <nav className="light-nav">
            <div className="light-brand">
                <strong>MYVAULT</strong>
            </div>
              
                <div className="light-links">
  
                    <Link to="/">Welcome</Link>        
                    <Link to="/compare">Compare Yourself</Link>            
                    <Link to="/account">My Account</Link>
           
                </div>
            
          </nav>      
        </header>
      );
    }
  }