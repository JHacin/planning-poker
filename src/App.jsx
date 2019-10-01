import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import JoinSessions from "./components/JoinSessionsPage";
import MySessionsPage from "./components/MySessionsPage";
import PrivateRoute from "./components/PrivateRoute";
import LogoutRoute from "./components/LogoutRoute";
import AddSessionForm from "./components/AddSessionForm";
import Session from "./components/Session/Session";
import { isLoggedIn } from "./util/user";

const App = () => {
  return (
    <Router>
      <Header />
      <PrivateRoute path="/join-sessions" component={JoinSessions} />
      <PrivateRoute path="/my-sessions" exact component={MySessionsPage} />
      <PrivateRoute path="/my-sessions/add" exact component={AddSessionForm} />
      <PrivateRoute path="/sessions/:id" exact component={Session} />
      <PrivateRoute path="/logout" exact component={LogoutRoute} />
      <Route path="/login" exact component={LoginPage} />
      <Route render={() => <Redirect to={isLoggedIn() ? "/join-sessions" : "/login"} />} />
    </Router>
  );
};

export default App;
