import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';
import TokenManager from '../utils/token-manager';

class GithubLogin extends React.Component {
  componentDidMount() {
    const { code } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    axios.post('http://127.0.0.1:6666/auth/github', { code })
      .then((response) => {
        TokenManager.setToken(response.data.token);
        this.props.onLogin();
        this.props.history.push('/');
      })
      .catch(() => {
        this.props.history.push('/');
      });
  }

  render() {
    return <p>Reticulating Splines...</p>;
  }
}

GithubLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default GithubLogin;
