import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MediumHeading from "../Heading/MediumHeading";

const SessionDetails = styled.ul`
  display: table-row;
  font-size: 1.5rem;
`;

const SessionDetailsItem = styled.li`
  display: table-cell;
  padding: 0 2rem 1.5rem 0;

  @media all and (max-width: 767px) {
    padding: 0 1rem 1.5rem 1rem;

    &:first-child {
      padding-left: 0;
    }
  }
`;

const Session = ({ columns }) => {
  return (
    <SessionDetails>
      {columns.map(column => (
        <SessionDetailsItem>{column}</SessionDetailsItem>
      ))}
    </SessionDetails>
  );
};

Session.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.node).isRequired
};

const SessionList = ({ title, listItems }) => {
  return (
    <div>
      {title && <MediumHeading>{title}</MediumHeading>}
      <ul>
        {listItems.map(item => (
          <Session key={item} columns={item} />
        ))}
      </ul>
    </div>
  );
};

SessionList.propTypes = {
  title: PropTypes.string,
  listItems: PropTypes.arrayOf(PropTypes.array).isRequired
};

SessionList.defaultProps = {
  title: false
};

export default SessionList;
