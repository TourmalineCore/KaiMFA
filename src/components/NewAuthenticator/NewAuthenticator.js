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
const QR_HELP_VIEW = 'QR_HELP_VIEW';

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

    const viewMap = {
      [FORM_VIEW]: (
        <NewAuthenticatorFields
          name={name}
          secret={secret}
          onNameChange={(name) => this.setState({ name })}
          onSecretChange={(secret) => this.setState({ secret })}
          onCancel={() => this.props.history.push('/list')}
          onScan={() => this.setState({ mode: QR_VIEW })}
          onSave={this.onSave}
        />
      ),
      [QR_VIEW]: (
        <ScanView
          handleError={this.handleError}
          handleScan={this.handleScan}
          onCancel={() => this.setState({ mode: FORM_VIEW })}
          onShowHelp={() => this.setState({ mode: QR_HELP_VIEW })}
        />
      ),
      [QR_HELP_VIEW]: (
        <HelpView
          onCancel={() => this.setState({ mode: QR_VIEW })}
        />
      )
    }

    return viewMap[mode];
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
  handleScan,
  handleError,
  onCancel,
  onShowHelp,
}) {
  useNavigation();

  return (
    <>
      <Header title="Scan QR Code" />
      <div className="content" style={{ textAlign: 'center' }}>
        <QrReader
          delay={300}
          facingMode="environment"
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
        <div className="message" style={{ marginTop: '-21px' }}>Point at the QR code</div>
      </div>
      <Softkey
        left="Cancel"
        onKeyLeft={onCancel}
        right="Help"
        onKeyRight={onShowHelp}
      />
    </>
  );
}

function HelpView({
  onCancel,
}) {
  useNavigation();

  return (
    <>
      <Header title="Help: Scan QR Code" />
      <div className="content" style={{paddingBottom: '28px'}}>
        <div className="message" style={{ marginTop: '-27px' }}>
          Point your device camera at the QR that is going to be used to generate one time password (OTP) codes.
          <br/>
          You do not need to push any buttons just wait for a few moments until it is recognized.
          <br/>
          In case you accedentally denied access to the camera you can give it another try going to 
          Settings | Privacy & Security | App Permissions | KaiMFA then select Camera and choose Ask or Grant and re-open the app.
        </div>
      </div>
      <Softkey
        left="Cancel"
        onKeyLeft={onCancel}
      />
    </>
  );
}

export default withRouter(NewAuthenticator);