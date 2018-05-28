import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import SignUp from './components/sign-up';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(user) {
    this.setState({ user });
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (this.state.user ?
            <Home {...props} user={this.state.user} /> :
            <Redirect to="/login" />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login {...props} onLogin={this.handleLogin} />
          )}
        />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    );
  }
}

export default App;
