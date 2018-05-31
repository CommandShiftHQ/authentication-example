import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TokenManager from '../utils/token-manager';

class GithubLogin extends React.Component {
  componentDidMount() {
    const code = this.props.location.search.match(/code=([\w\d]+)/)[1];
    axios.post('http://127.0.0.1:3000/auth/github', { code })
      .then((response) => {
        TokenManager.setToken(response.data.token);
        this.props.onLogin();
        this.props.history.push('/');
      })
      .catch(error => {
        this.props.history.push('/');
      });
  }

  render() {
    return <p>Reticulating Spleens...</p>;
  }
}

GithubLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default GithubLogin;
