import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from '../components/auth'
import authService from '../services/authService'

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    load: false
  };

  handleLogin = () => {
    this.props.onLogin({
      username: this.state.username,
      loggedIn: true,
    });
  };

  handleChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };  

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input onChange={this.handleChange} type="text" value={this.state.username} />
        <button onClick={this.handleLogin}>Log In</button>
        {/* <Auth /> */}
        <button onClick={()=> {authService.handleEmailAndPasswordLogin("abhimait1909@gmail.com", "ak@123456")}} >Google Auth</button>
      </div>
    );
  }
}
