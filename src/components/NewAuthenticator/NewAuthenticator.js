import React from 'react';
import { withRouter } from 'react-router-dom';
import QrReader from 'react-qr-reader';

import { Header } from '../Header/Header';
import Softkey from '../Softkey/Softkey';
import { Input } from '../Input/Input';
import { createAuthenticator } from '../../services/authenticatorsProvider';
import { useNavigation } from '../../hooks/useNavigation';

const FORM_VIEW = 'FORM_VIEW';
const QR_VIEW = 'QR_VIEW';

class NewAuthenticator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      secret: '',
      mode: FORM_VIEW,
    };
  }

  handleScan = data => {
    if (data) {
      console.log('!!!!!!!!!')
      console.log(this.state)
      console.log(data)
      this.setState({
        secret: data,
        mode: FORM_VIEW,
      })
    }
  }

  handleError = err => {
    console.error(err)
  }

  render() {
    const {
      name,
      secret,
      mode,
    } = this.state;

    return mode === FORM_VIEW
      ? (
        <NewAuthenticatorFields
          name={name}
          secret={secret}
          onNameChange={(name) => this.setState({ name })}
          onSecretChange={(secret) => this.setState({ secret })}
          onCancel={() => this.props.history.push('/list')}
          onScan={() => this.setState({ mode: QR_VIEW })}
          onSave={this.onSave}
        />
      )
      : (
        <ScanView
          handleError={this.handleError}
          handleScan={this.handleScan}
          onCancel={() => this.setState({ mode: FORM_VIEW })}
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
  name,
  secret,
  onNameChange,
  onSecretChange,
  onCancel,
  onScan,
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
          value={name}
          onChange={onNameChange}
          placeholder="Name is max 20 symbols"
          maxLength={20}
          dataCy="name"
        />
        <Input
          type="text"
          label="Secret"
          value={secret}
          onChange={onSecretChange}
          multiline={true}
          placeholder="Please scan the QR code or type in the secret/key. Usually it is shown as text additionally to the QR code."
          dataCy="secret"
        />
      </div>
      <Softkey
        left="Cancel"
        onKeyLeft={onCancel}
        center="Scan"
        onKeyCenter={onScan}
        right="Save"
        onKeyRight={onSave}
      />
    </>
  );
}

function ScanView({
  result,
  handleScan,
  handleError,
  onCancel,
}) {
  useNavigation();

  return (
    <>
      <Header title="Scan QR Code" />
      <div className="content">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
        <p>{result}</p>
      </div>
      <Softkey
        left="Cancel"
        onKeyLeft={onCancel}
        center="Scan"
        onKeyCenter={onCancel}
      />
    </>
  );
}

export default withRouter(NewAuthenticator);