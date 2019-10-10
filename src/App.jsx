import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Page/Login";
import Header from "./components/Header";
import JoinSessions from "./components/Page/JoinSessions";
import MySessions from "./components/Page/MySessions";
import PrivateRoute from "./components/Route/PrivateRoute";
import Logout from "./components/Page/Logout";
import AddSession from "./components/Page/AddSession";
import Session from "./components/Session/Session";
import { isLoggedIn } from "./util/user";

const App = () => {
  const catchAllRedirectLocation = isLoggedIn() ? "/join-sessions" : "/login";

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/join-sessions" exact component={JoinSessions} />
        <PrivateRoute path="/my-sessions" exact component={MySessions} />
        <PrivateRoute path="/my-sessions/add" exact component={AddSession} />
        <PrivateRoute path="/sessions/:id" exact component={Session} />
        <PrivateRoute path="/logout" exact component={Logout} />
        <Route path="/" render={() => <Redirect to={catchAllRedirectLocation} />} />
      </Switch>
    </Router>
  );
};

export default App;
