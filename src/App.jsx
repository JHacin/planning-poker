import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserList from "./components/UserList";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import JoinSessions from "./components/JoinSessions";
import MySessions from "./components/MySessions";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Route path="/login" component={LoginForm} />
      <PrivateRoute path="/" exact component={UserList} />
      <PrivateRoute path="/join-sessions" exact component={JoinSessions} />
      <PrivateRoute path="/my-sessions" exact component={MySessions} />
    </Router>
  );
};

export default App;
