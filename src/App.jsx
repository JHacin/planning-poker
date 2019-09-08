import React from "react";
import { connect } from "react-redux";
import UserList from "./components/UserList";
import { sendUserLogin } from "./redux/actions";
import LoginForm from "./components/LoginForm";
import { getCurrentUserUuid } from "./util/user";

const App = () => {
  const isLoggedIn = getCurrentUserUuid();
  return (
    <div className="App">
      <h1>Planning Poker</h1>
      <hr />
      {!isLoggedIn && <LoginForm />}
      {isLoggedIn && <UserList />}
    </div>
  );
};

export default connect(
  null,
  { sendUserLogin }
)(App);
