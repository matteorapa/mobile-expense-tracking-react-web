import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ProtectedRoute from './protected.route'


//import pages
import Vault from './pages/Vault';
import Compare from './pages/Compare'
import Account from './pages/Account'
import Welcome from './pages/Welcome'
import ErrorPage from './pages/ErrorPage'

//import components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>

        <Header />
        
        <Switch>
          <Route path="/" component={Welcome} exact />
          <ProtectedRoute path="/vault" component={Vault} exact />
          <ProtectedRoute path="/compare" component={Compare} />
          <Route path="/account" component={Account} />
          <Route path="*" component={ErrorPage} />
        </Switch>

        <Footer />

      </div>
    </Router>
    
  );
}

export default App;
