import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import authentication from './authentication'

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} 
        render={
            props => {
                if(authentication.isAuthenticated()){
                    return <Component {...props} />
                }else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }                         

                        }
                        
                    } />
                }
                
            }
        }  />
    );

    
}

export default ProtectedRoute;