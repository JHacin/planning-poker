import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { sendAddSession, sendGenerateNextSessionId } from "../redux/actions";
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

const formInitialState = {
  name: "",
  scaleType: SCALE_FIBONACCI,
  userStories: [],
  submitted: false
};

class AddSessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...formInitialState };
  }

  componentDidMount() {
    const { sendGenerateNextSessionId } = this.props;
    sendGenerateNextSessionId();
  }

  handleNameChange = name => this.setState({ name });

  handleScaleTypeChange = scaleType => this.setState({ scaleType });

  handleSubmit = event => {
    event.preventDefault();
    const { sendAddSession, nextSessionId } = this.props;
    const { submitted, ...restOfState } = this.state;

    sendAddSession({
      ...restOfState,
      id: nextSessionId,
      owner: getCurrentUserUuid()
    });

    this.setState({ submitted: true });
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
    const { userStories, submitted } = this.state;
    const { nextSessionId } = this.props;

    if (submitted) {
      return <Redirect to={`/sessions/${nextSessionId}`} />;
    }

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
              required
              autoFocus
              key={story.id}
              onChange={e =>
                this.onUserStoryInputChange(story.id, e.target.value)
              }
            />
          ))}
          <input
            type="submit"
            value="Start"
            hidden={!userStories.length ? "hidden" : ""}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nextSessionId: state.sessions.nextSessionId
});

AddSessionForm.propTypes = {
  nextSessionId: PropTypes.number.isRequired,
  sendAddSession: PropTypes.func.isRequired,
  sendGenerateNextSessionId: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { sendAddSession, sendGenerateNextSessionId }
  )(AddSessionForm)
);
