import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { sendAddSession } from "../redux/actions";
import scaleTypes from "../scaleTypes";
import { SCALE_FIBONACCI } from "../constants";
import { getCurrentUserUuid } from "../util/user";

const ScaleTypeOptionList = ({ onChange }) => {
  return (
    <select
      onChange={e => onChange(e.target.value)}
      defaultValue={SCALE_FIBONACCI}
    >
      {scaleTypes.map(type => (
        <option key={type.machineName} value={type.machineName}>
          {type.title}
        </option>
      ))}
    </select>
  );
};

ScaleTypeOptionList.propTypes = {
  onChange: PropTypes.func.isRequired
};

class AddSessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      scaleType: SCALE_FIBONACCI,
      userStories: []
    };
  }

  handleNameChange = name => {
    this.setState({ name });
  };

  handleScaleTypeChange = scaleType => {
    this.setState({ scaleType });
  };

  handleSubmit = e => {
    const { name, scaleType, userStories } = this.state;
    const { sendAddSession } = this.props;

    e.preventDefault();
    sendAddSession({
      name,
      scaleType,
      userStories,
      owner: getCurrentUserUuid()
    });

    this.setState({
      name: "",
      scaleType: SCALE_FIBONACCI,
      userStories: []
    });
  };

  addUserStory = () => {
    this.setState(prevState => ({
      userStories: [
        ...prevState.userStories,
        {
          id: prevState.userStories.length + 1,
          text: ""
        }
      ]
    }));
  };

  onUserStoryInputChange = (storyId, text) => {
    const { userStories } = this.state;

    this.setState({
      userStories: userStories.map(story => ({
        ...story,
        text: story.id === storyId ? text : story.text
      }))
    });
  };

  render() {
    const { userStories } = this.state;

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            required
            placeholder="My session name..."
            onChange={e => this.handleNameChange(e.target.value)}
          />
          <ScaleTypeOptionList onChange={this.handleScaleTypeChange} />
          <button type="button" onClick={this.addUserStory}>
            + Add
            {userStories.length ? " another " : " "}
            user story
          </button>
          {userStories.map(story => (
            <input
              autoFocus
              key={story.id}
              onChange={e =>
                this.onUserStoryInputChange(story.id, e.target.value)
              }
            />
          ))}
          <input type="submit" value="Start" />
        </form>
      </div>
    );
  }
}

AddSessionForm.propTypes = {
  sendAddSession: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { sendAddSession }
  )(AddSessionForm)
);
