import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import UserList from "./components/UserList";
import { send_userLogin } from "./redux/actions";
import LoginForm from "./components/LoginForm";
import { getCurrentUserUuid } from "./util/user";

class App extends Component {
	render() {
		const isLoggedIn = getCurrentUserUuid();

		return (
			<div className="App">
				<h1>Planning Poker</h1>
				<hr />
				{!isLoggedIn && <LoginForm />}
				{isLoggedIn && <UserList />}
			</div>
		);
	}
}

export default connect(
	null,
	{ send_userLogin }
)(App);
