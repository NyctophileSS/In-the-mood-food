import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './styles.css';

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import QuizPage from './pages/QuizPage';
import VerificationPage from './pages/VerificationPage';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/cards" exact>
          <CardPage />
        </Route>
        <Route path="/quiz" exact>
          <QuizPage />
        </Route>
        <Route path="/verification" exact>
          <VerificationPage />
        </Route>
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
