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
           <h1>Welcome Page</h1>
            <Signin />
        
        </div>
        
      );
    }
  }