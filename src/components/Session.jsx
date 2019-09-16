import React, { Component } from "react";

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      scaleType: "",
      userStories: []
    };
  }

  render() {
    return (
      <div>
        <span>Hello</span>
      </div>
    );
  }
}

export default Session;
