import React, { Component } from 'react';
import { isAuthenticated, hasSetPassword } from '../../services/passwordProvider';

export default function (ComposedComponent) {
  class RequirePassword extends Component {
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
      if (!hasSetPassword()) {
        this.props.history.push('/set-password');
        return;
      }

      if (!isAuthenticated()) {
        this.props.history.push('/login');
      }
    }

    render() {
      if (isAuthenticated()) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  return RequirePassword;
}
