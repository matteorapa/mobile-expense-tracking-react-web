import React from 'react';
import authentication from '../authentication';
import Header from '../components/Header';

export default class Compare extends React.Component {
  
    render() {
      return (
        <div>
           <Header />
          <div className="main-container">
              <span><strong>Compare Page</strong></span>
          </div>
        </div>
      );
    }
  }