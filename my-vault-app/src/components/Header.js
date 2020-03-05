import React from 'react';
import {Link} from "react-router-dom";

export default class Header extends React.Component {

  
    render() {
      return (
        <header>
            <nav>
            <span>My navigation bar</span>
            <ul>
              <li>
                <Link to="/">My Vault</Link>
              </li>
              <li>
                <Link to="/compare">Compare Yourself</Link>
              </li>
              <li>
                <Link to="/account">My Account</Link>
              </li>
            </ul>
          </nav>
        </header>
      );
    }
  }