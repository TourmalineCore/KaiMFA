import React from 'react';
import { withRouter } from 'react-router-dom';

import { Header } from '../Header/Header';
import Softkey from '../Softkey/Softkey';
import { Input } from '../Input/Input';
import { useNavigation } from '../../hooks/useNavigation';
import { setSessionPassword, isValidPassword } from '../../services/passwordProvider';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      showInvalidMessage: false,
    };
  }
  render() {
    return (
      <LoginForm
        onPasswordChange={(password) => this.setState({
          password,
          showInvalidMessage: false,
        })}
        onCenter={this.onLogin}
        showValidation={this.state.showInvalidMessage}
      />
    );
  }

  onLogin = async () => {
    const {
      password,
    } = this.state;

    if (!isValidPassword(password)) {
      this.setState({
        showInvalidMessage: true,
      });

      return;
    }

    setSessionPassword(password);

    this.props.history.push('/list');
  }
}

function LoginForm({
  onPasswordChange,
  onCenter,
  showValidation,
}) {
  useNavigation();

  return (
    <>
      <Header title="Login" />
      <div className="content">
        <Input
          type="password"
          label="Password"
          onChange={onPasswordChange}
          placeholder="Please enter the password"
          dataCy="password"
        />
        {
          showValidation &&
          <div className="message" style={{color: 'red'}}>
            Password doesn't match the one you entered when you opened the app at the first time.
          </div >
        }
      </div>
      <Softkey
        center="Go"
        onKeyCenter={onCenter}
      />
    </>
  );
}

export default withRouter(Login);