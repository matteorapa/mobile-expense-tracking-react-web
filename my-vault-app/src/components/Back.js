import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class Back extends React.Component {
  
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  handleClick(){
   
    const {history} = this.props;
    history.goBack();
  }


    render() {

      return ( 
      <button type="button" className="btn btn-light" onClick={this.handleClick.bind(this)}><i className="fas fa-long-arrow-alt-left"></i> back</button> 
      );
    
    }
  }

  export default withRouter(Back);

