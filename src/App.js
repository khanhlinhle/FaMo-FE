import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage/LoginPage';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/detail" exact component={DetailPage} />
      </Switch>
    </div>
  );
}

export default App;
