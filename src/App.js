import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage/LoginPage';
import { BrowserRouter as Switch, Route, Redirect } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';
import { useSelector } from "react-redux";

function App() {

  let user = useSelector(state => state.user);

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/" exact component={HomePage} />
        <ProtectedRoute
          path="/detail"
          render={(props) => <DetailPage {...props} />}
        />
        {/* <Route path="*" component={Page404} /> */}
      </Switch>
    </div>
  );
}

export default App;
