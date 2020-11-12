import React from 'react';
import { withRouter } from 'react-router-dom';

import { Header } from '../Header/Header';
import Softkey from '../Softkey/Softkey';
import { Input } from '../Input/Input';
import { useNavigation } from '../../hooks/useNavigation';
import { savePassword } from '../../services/passwordProvider';
import { APP_NAME } from '../../config';

class SetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
    };
  }
  render() {
    return (
      <PasswordForm
        onPasswordChange={(password) => this.setState({ password })}
        onSave={this.onSave}
      />
    );
  }

  onSave = async () => {
    const {
      password,
    } = this.state;

    if (!password) {
      return;
    }

    savePassword(password);

    this.props.history.push('/list');
  }
}

function PasswordForm({
  onPasswordChange,
  onSave,
}) {
  useNavigation();

  return (
    <>
      <Header title="Password Setup" />
      <div className="content">
        <Input
          type="password"
          label="Password"
          onChange={onPasswordChange}
          placeholder="Password is max 20 symbols"
          maxLength={20}
          dataCy="password"
        />
        <div className="message">
          Secrets will be encrypted using this password and you will need it to open {APP_NAME}. Authenticators will be inaccessible if you forget the password and don't have a backup.
        </div >
      </div>
      <Softkey
        right="Save"
        onKeyRight={onSave}
      />
    </>
  );
}

export default withRouter(SetPassword);