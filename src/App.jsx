import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import JoinSessions from "./components/JoinSessions";
import MySessions from "./components/MySessions";
import PrivateRoute from "./components/PrivateRoute";
import LogoutRoute from "./components/LogoutRoute";
import AddSessionForm from "./components/AddSessionForm";
import Session from "./components/Session/Session";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Route path="/login" component={LoginPage} />
      <PrivateRoute path="/" exact component={LandingPage} />
      <PrivateRoute path="/join-sessions" exact component={JoinSessions} />
      <PrivateRoute path="/my-sessions" exact component={MySessions} />
      <PrivateRoute path="/my-sessions/add" exact component={AddSessionForm} />
      <PrivateRoute path="/sessions/:id" exact component={Session} />
      <PrivateRoute path="/logout" exact component={LogoutRoute} />
    </Router>
  );
};

export default App;
