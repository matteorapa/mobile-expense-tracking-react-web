import React from 'react';
import {Link} from "react-router-dom";
import './component.css';
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
                  <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to="/compare" className="nav-link">Compare Yourself</Link>    
                </li>
                <li className="nav-item">
                  <Link to="/vault" className="nav-link">My Finance</Link>    
                </li>
                <li className="nav-item">
                  <Link to="/account" className="nav-link">Account</Link>    
                </li>
                
              </ul>
                <DarkMode />
              <form className="form-inline my-2 my-lg-0">
                <LoginControl />
              </form>
            </div>
          </nav>   
        </header>
      );
    
  }
  export default Header;