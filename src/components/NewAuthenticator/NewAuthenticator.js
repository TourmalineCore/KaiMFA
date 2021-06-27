import React from 'react';
import { withRouter } from 'react-router-dom';
import QrReader from 'react-qr-reader';

import { Header } from '../Header/Header';
import Softkey from '../Softkey/Softkey';
import { Input } from '../Input/Input';
import { createAuthenticator } from '../../services/authenticatorsProvider';
import { useNavigation } from '../../hooks/useNavigation';
import normalizeSecret from './secretNormalizer';

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
        <div className="message" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          paddingLeft: 0,
          paddingRight: 0
        }}>
          Point the camera at the QR code. See Help section if it does not work.
        </div>
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
      <div className="content" style={{ paddingBottom: '28px' }}>
        <div className="message">
          Point your device camera at the QR code that is going to be used to generate one time password (OTP) codes. You should put your camera close enough for the QR code to fit in the red frame.
          <br />
          You do not need to push any buttons, just wait for a few moments until it is recognized and you are redirected back to the authenticator creation page with the filled Secret field.
          <br />
          <br />
          You can still fill in the secret manually if the QR code recognition does not work, i.e. you are not redirected back to the authenticator creation page after you pointed the camera at the QR code. The Secret or Key is usually available near the QR code itself or hidden under some link like: Can't scan it?
          <br />
          If you see the white backgroud and do not see the camera video and you are sure that you allowed the app to access the camera, please close and re-open the app.
          <br />
          In case you accidentally denied access to the camera, you can give it another try going to
          Settings | Privacy & Security | App Permissions | KaiMFA, then select Camera, choose Ask or Grant and re-open the app.
          <br />
          <br />
          In case any issue occurs or if you would like to ask for a new feature in the app, please feel free to open a new issue on the app's GitHub page https://github.com/TourmalineCore/KaiMFA/issues.
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