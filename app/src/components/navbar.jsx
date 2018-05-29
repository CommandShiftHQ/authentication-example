import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const styles = {
  activeLink: { fontWeight: 'bold' },
  padRight: { paddingRight: 20 },
};

const NavBar = ({ user, isLoggedIn, onLogout }) => (
  <nav style={{ backgroundColor: 'lightgrey', padding: 10 }}>
    <NavLink exact to="/" style={styles.padRight} activeStyle={styles.activeLink}>Home</NavLink>
    <NavLink exact to="/secrets" activeStyle={styles.activeLink}>Secrets</NavLink>
    {
      isLoggedIn &&
      <div style={{ display: 'inline-block', float: 'right' }}>
        <span style={styles.padRight}>{user.firstName} {user.lastName}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    }
  </nav>
);

NavBar.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
  },
};

export default NavBar;
