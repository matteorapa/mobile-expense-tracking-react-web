import React from 'react';
import Header from '../components/Header';

export default class ErrorPage extends React.Component {
  
    render() {
      return (
        <div>
           <Header />
            <div className="main-container">
                <p className="text-danger text-center">404 Page not found.</p>
              
            </div>
        </div>
      );
    }
  }