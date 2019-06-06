import React from 'react';
import axios from 'axios';
import TokenManager from '../utils/token-manager';

const styles = {
  flex: { display: 'flex' },
  flexItem: { flex: 1 },
};

class Secrets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secrets: [],
      message: '',
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getSecrets();
  }

  getSecrets() {
    axios.get('http://127.0.0.1:3000/secrets', {
      headers: { Authorization: TokenManager.getToken() },
    })
      .then((response) => {
        this.setState({ secrets: response.data });
      })
      .catch(() => {
        TokenManager.removeToken();
        this.props.history.push('/login');
      });
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit() {
    axios.post('http://127.0.0.1:3000/secrets', {
      message: this.state.message,
    }, {
      headers: { Authorization: TokenManager.getToken() },
    })
      .then((response) => {
        this.setState({
          secrets: this.state.secrets.concat(response.data),
          message: '',
        });
      })
      .catch(() => {
        TokenManager.removeToken();
        this.props.history.push('/login');
      });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Secrets</h1>
        </div>
        <div style={styles.flex}>
          <div style={styles.flexItem}>
            <h2>Your Secrets</h2>
            <ul>
              {
                this.state.secrets.map(secret => (
                  <li key={secret._id}>{secret.message}</li>
                ))
              }
            </ul>
          </div>
          <div style={styles.flexItem}>
            <h2>Add Secret</h2>
            <label htmlFor="message">Message:
              <input
                type="text"
                name="message"
                value={this.state.message}
                onChange={this.handleMessageChange}
              />
            </label>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Secrets;
