import React from 'react';
import {Link} from "react-router-dom";
import authentication from '../authentication';
import './component.css';


export const LoginControl = props => {

    // if (authentication.isAuthenticated()) {
    //     //give logout option
    //      return <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={authentication.logout(() => {this.props.history.push('/')})}>Sign Out</button>;
    // } else {
    
    //     return <Link to="/"><button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.history.push('/account')}>Sign Up</button> </Link>;
    // }

    return (
        <div>
            <Link to="/account"><button className="btn btn-outline-success my-2 my-sm-0" >Sign Up</button> </Link>
        </div>
    );

};

export default LoginControl;



   
    
   
        
 