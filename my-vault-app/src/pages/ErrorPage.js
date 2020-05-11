import React from 'react';
import {Link} from "react-router-dom";
import Header from '../components/Header';

export default class ErrorPage extends React.Component {
  
    render() {
      return (
        <div>
           <Header />
            <div className="main-container focused">
                <br /><br />
                <div className="error-box">
                    <h2 className="error-text"><i className="fas fa-exclamation-circle text-danger"></i> It seems we can't find that page. Maybe try checking the address again.</h2>
                    <div className="button-row">
                    
                      <Link to="/" className="btn btn-outline-secondary function" onClick={this.handleApply} >Go to homepage</Link>

                    </div>
                </div>
                 
              
            </div>
        </div>
      );
    }
  }