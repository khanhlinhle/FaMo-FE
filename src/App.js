import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage/LoginPage';
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';
import Page404 from './pages/Page404/Page404';
import { useSelector } from "react-redux";

function App() {

  let user = useSelector(state => state.user);

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === false) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute
            path="/detail"
            render={(props) => <DetailPage {...props} />}
          />
          {/* <Route path="/detail" exact component={DetailPage} /> */}
          <Route path="/404" component={Page404} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
