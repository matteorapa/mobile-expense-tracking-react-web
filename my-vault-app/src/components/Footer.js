import React from 'react';
import Stocks from '../components/Stocks'


export default class Footer extends React.Component {

  
    render() {
      return (
        <footer className="footer">
          <div className="container">
              <hr />
            <span className="text-muted">Place sticky footer content here.</span>
            <Stocks />
          </div>
      </footer>
      );
    }
  }