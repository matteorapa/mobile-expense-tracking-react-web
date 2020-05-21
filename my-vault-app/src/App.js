import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ProtectedRoute from './protected.route'

import Vault from './pages/Vault';
import Compare from './pages/Compare'
import Account from './pages/Account'
import Welcome from './pages/Welcome'
import ErrorPage from './pages/ErrorPage'
import ExpenseTemplate from './pages/ExpenseTemplate'
import Footer from './components/Footer';
import Preferences from './pages/Preferences';
import AddTransaction from './pages/AddTransaction'
import AddPeriodic from './pages/AddPeriodic';
import PeriodicLoader from './pages/PeriodicLoader'; 
import EditTransaction from './pages/EditTransaction';

function App() {
  return (
    <Router>
      <div>

        <Switch>
          <Route path="/" component={Welcome} exact />
          <ProtectedRoute path="/vault" component={Vault} exact />
          <ProtectedRoute path="/compare" component={Compare} exact/>
          <ProtectedRoute path="/expense" component={ExpenseTemplate} />
          <ProtectedRoute path="/periodic" component={PeriodicLoader} />
          <ProtectedRoute path="/addexpense" component={AddTransaction} />
          <ProtectedRoute path="/editexpense" component={EditTransaction} />
          <ProtectedRoute path="/addperiodic" component={AddPeriodic} />
          <ProtectedRoute path="/account" component={Preferences} />
          <Route path="/signup" component={Account} exact/>
          <Route path="*" component={ErrorPage} />
        </Switch>

        <Footer />

      </div>
    </Router>
    
  );
}

export default App;
