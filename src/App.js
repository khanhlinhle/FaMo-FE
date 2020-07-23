import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage/LoginPage';
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';
import Page404 from './pages/Page404/Page404';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function App() {

  let user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      };

      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        dispatch({ type: "LOGIN", payload: res.data });

      } catch (error) {
        localStorage.removeItem("token");
      };
    };
    fetchUser();
  }, []);

  console.log(user)

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
