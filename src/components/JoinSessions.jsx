import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSessionsWithFullData } from "../redux/selectors";
import { getTitle } from "../scaleTypes";

const NoSessionsDisplay = () => {
  return (
    <div>
      <h3>Huh, no sessions available. Create one?</h3>
      <Link to="/my-sessions/add">Create session</Link>
    </div>
  );
};

const JoinSessions = ({ sessions }) => {
  const { idList, byId } = sessions;

  if (!idList || !idList.length) {
    return <NoSessionsDisplay />;
  }

  return (
    <div>
      <h3>Available sessions to join</h3>
      <ul>
        {idList.map(id => (
          <li>
            <p>
              <strong>Name: </strong>
              {byId[id].name}
            </p>
            <p>
              <strong>Scale type: </strong>
              {getTitle(byId[id].scaleType)}
            </p>
            <p>
              <strong>Moderated by: </strong>
              {byId[id].ownerName}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  sessions: getSessionsWithFullData(state)
});

JoinSessions.propTypes = {
  sessions: PropTypes.shape({
    idList: PropTypes.arrayOf(PropTypes.string).isRequired,
    byId: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        scaleType: PropTypes.string.isRequired,
        ownerName: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  null
)(JoinSessions);
