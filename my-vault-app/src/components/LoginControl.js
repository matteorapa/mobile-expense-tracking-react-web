import React from 'react';
import {Link} from "react-router-dom";
import authentication from '../authentication';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import './component.css';

class LoginControl extends React.Component {

        constructor(props){
        
            super(props);
            this.handleClick = this.handleClick.bind(this);
        }

        static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
        };

        handleClick(){
            const {history} = this.props;
            authentication.logout(() => { history.push('/') });
        }

        
        render() {
            
            if (authentication.isAuthenticated()) {
                    
                return <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.handleClick}>Sign Out</button>;

            } else {
            
                return <Link to="/signup"><button className="btn btn-outline-success my-2 my-sm-0" >Sign Up</button> </Link>;
            }
        }
    }

    export default withRouter(LoginControl);





   
    
   
        
 