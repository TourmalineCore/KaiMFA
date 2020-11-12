import React from 'react';
import { withRouter } from 'react-router-dom';

import { Header } from '../Header/Header';
import Softkey from '../Softkey/Softkey';
import { Input } from '../Input/Input';
import { createAuthenticator } from '../../services/authenticatorsProvider';
import { useNavigation } from '../../hooks/useNavigation';

class NewAuthenticator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      secret: '',
    };
  }
  render() {
    return (
      <NewAuthenticatorFields
        onNameChange={(name) => this.setState({ name })}
        onSecretChange={(secret) => this.setState({ secret })}
        onCancel={() => this.props.history.push('/list')}
        onSave={this.onSave}
      />
    );
  }

  onSave = () => {
    const {
      name,
      secret,
    } = this.state;

    const normalizedSecret = normalizeSecret(secret);

    if (!name || !normalizedSecret) {
      return;
    }

    createAuthenticator({
      name,
      secret: normalizedSecret,
    });

    this.props.history.push('/list');
  }
}

function normalizeSecret(secret) {
  let normalizedSecret;
  if (!secret) {
    normalizedSecret = '';
  }

  normalizedSecret = secret.replace(/\s+/g, ''); // remove spaces
  normalizedSecret = normalizedSecret.toLowerCase();

  return normalizedSecret;
}

function NewAuthenticatorFields({
  onNameChange,
  onSecretChange,
  onCancel,
  onSave,
}) {
  useNavigation();

  return (
    <>
      <Header title="New Authenticator" />
      <div className="content">
        <Input
          type="text"
          label="Name"
          onChange={onNameChange}
          placeholder="Name is max 20 symbols"
          maxLength={20}
          dataCy="name"
        />
        <Input
          type="text"
          label="Secret"
          onChange={onSecretChange}
          multiline={true}
          placeholder="Please specify the secret/key. Usually it is shown as text additionally to the QR code."
          dataCy="secret"
        />
      </div>
      <Softkey
        left="Cancel"
        onKeyLeft={onCancel}
        right="Save"
        onKeyRight={onSave}
      />
    </>
  );
}

export default withRouter(NewAuthenticator);