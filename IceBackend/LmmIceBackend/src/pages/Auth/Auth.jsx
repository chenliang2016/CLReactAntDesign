import React, { Component } from 'react';
import UserLogin from './components/UserLogin';

export default class Auth extends Component {
  static displayName = 'Auth';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="auth-page">
        <UserLogin />
      </div>
    );
  }
}
