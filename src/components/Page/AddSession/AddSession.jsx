import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import {
  sendAddSession,
  sendGenerateNextSessionId
} from "../../../redux/actions";
import { SCALE_FIBONACCI } from "../../../constants";
import { getCurrentUserId, getCurrentUserName } from "../../../util/user";
import ArrayUtil from "../../../util/array";
import { userStoryInitialState } from "../../../redux/reducers/sessions";
import AddSessionForm from "../../Form/AddSessionForm";
import FluidContainer from "../../Container/FluidContainer";

export const FormContext = React.createContext({});

class AddSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      scaleType: SCALE_FIBONACCI,
      userStories: [],
      submitted: false
    };
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
      moderator: {
        id: getCurrentUserId(),
        username: getCurrentUserName()
      }
    });

    this.setState({ submitted: true });
  };

  handleAddUserStory = () => {
    this.setState(prevState => ({
      userStories: [
        ...prevState.userStories,
        {
          ...userStoryInitialState,
          id: prevState.userStories.length + 1
        }
      ]
    }));
  };

  handleRemoveUserStory = id => {
    this.setState(prevState => ({
      userStories: [
        ...ArrayUtil.removeObjectsByPropValue(prevState.userStories, "id", id)
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
      <FormContext.Provider
        value={{
          handleSubmit: this.handleSubmit,
          handleNameChange: this.handleNameChange,
          handleScaleTypeChange: this.handleScaleTypeChange,
          handleAddUserStory: this.handleAddUserStory,
          handleRemoveUserStory: this.handleRemoveUserStory,
          onUserStoryInputChange: this.onUserStoryInputChange,
          userStories
        }}
      >
        <FluidContainer>
          <AddSessionForm />
        </FluidContainer>
      </FormContext.Provider>
    );
  }
}

AddSession.propTypes = {
  nextSessionId: PropTypes.number.isRequired,
  sendAddSession: PropTypes.func.isRequired,
  sendGenerateNextSessionId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  nextSessionId: state.sessions.nextSessionId
});

export default withRouter(
  connect(
    mapStateToProps,
    { sendAddSession, sendGenerateNextSessionId }
  )(AddSession)
);
