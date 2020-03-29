import React from 'react';
import {Link} from "react-router-dom";
import authentication from '../authentication';
import './component.css';


export const LoginControl = (props) => {

    if (authentication.isAuthenticated()) {
        
         return <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={props.exitUser}>Sign Out</button>;

    } else {
    
        return <Link to="/account"><button className="btn btn-outline-success my-2 my-sm-0" >Sign Up</button> </Link>;
    }

};

export default LoginControl;



   
    
   
        
 