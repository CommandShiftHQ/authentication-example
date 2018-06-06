import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthRoute from './components/auth-route';
import NavBar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/sign-up';
import Secrets from './components/secrets';
import GithubLogin from './components/github-login';

import TokenManager from './utils/token-manager';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: TokenManager.isTokenValid() ? TokenManager.getTokenPayload() : null,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  handleLogin() {
    this.setState({ user: TokenManager.getTokenPayload() });
  }

  handleLogout() {
    TokenManager.removeToken();
    this.setState({ user: null });
  }

  isLoggedIn() {
    return Boolean(this.state.user) && TokenManager.isTokenValid();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.isLoggedIn()}
          user={this.state.user}
          onLogout={this.handleLogout}
        />
        <Switch>
          <AuthRoute
            exact
            path="/"
            component={Home}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute
            exact
            path="/secrets"
            component={Secrets}
            authenticate={this.isLoggedIn}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login {...props} onLogin={this.handleLogin} />
            )}
          />
          <Route exact path="/sign-up" component={SignUp} />
          <Route
            exact
            path="/github-login"
            render={props => (
              <GithubLogin {...props} onLogin={this.handleLogin} />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
