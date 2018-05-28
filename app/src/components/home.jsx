import React from 'react';
import PropTypes from 'prop-types';

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Welcome {props.user.firstName} {props.user.lastName}</p>
  </div>
);

Home.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

export default Home;
