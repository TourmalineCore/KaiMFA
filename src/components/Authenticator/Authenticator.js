import React, { useState, useEffect } from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import { authenticator } from 'otplib';
import CryptoJS from 'crypto-js';

import { Header } from '../Header/Header';
import Softkey from '../Softkey/Softkey';
import { getAuthenticatorById } from '../../services/authenticatorsProvider';
import { useNavigation } from '../../hooks/useNavigation';
import ProgressBar from '../ProgressBar/ProgressBar';
import { PUBLISHER_ID, APP_NAME } from '../../config';
import { getSessionPassword } from '../../services/passwordProvider';

import './Authenticator.css';

export default function Authenticator() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [encryptedSecret, setEncryptedSecret] = useState('');
  const [secret, setSecret] = useState('');

  const [adFocused, setAdFocused] = useState(false);

  useNavigation();

  const {
    authenticatorId,
  } = useParams();

  useEffect(() => {
    async function loadAuthenticator() {
      const {
        name,
        encryptedSecret,
      } = await getAuthenticatorById(authenticatorId);

      setName(name);
      setEncryptedSecret(encryptedSecret);
    }
    loadAuthenticator();
  }, [authenticatorId]);

  useEffect(() => {
    function decryptSecret() {
      if (!encryptedSecret) {
        return;
      }

      const decryptedSecret = CryptoJS.AES.decrypt(encryptedSecret, getSessionPassword()).toString(CryptoJS.enc.Utf8);
      setSecret(decryptedSecret);
    }
    decryptSecret();
  }, [encryptedSecret]);

  useEffect(() => {
    const handleKeyDown = evt => {
      switch (evt.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          const adElement = document.querySelector('#ad-container .items');

          if (adElement) {
            adElement.focus();
            setAdFocused(true);
          }
          break;
        default:
          return;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!secret) {
      return;
    }

    // eslint-disable-next-line no-undef
    getKaiAd({
      publisher: PUBLISHER_ID,
      app: APP_NAME,

      test: process.env.NODE_ENV === 'development'
        ? 1
        : 0,

      h: 90,
      w: 238,

      // Max supported size is 240x264
      // container is required for responsive ads
      container: document.getElementById('ad-container'),
      onerror: err => console.error('Custom catch:', err),
      onready: ad => {

        // Ad is ready to be displayed
        // calling 'display' will display the ad
        ad.call('display', {

          // In KaiOS the app developer is responsible
          // for user navigation, and can provide
          // navigational className and/or a tabindex
          tabindex: 0,

          // if the application is using
          // a classname to navigate
          // this classname will be applied
          // to the container
          navClass: 'items',

          // display style will be applied
          // to the container block or inline-block
          display: 'block',
        });
      }
    });
  }, [secret]);

  const token = authenticator.generate(secret);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <Header title={name} />
      <div className="content" style={{ backgroundColor: 'white' }}>
        <div className="auth-content">
          <span className="auth-content__code">
            {
              secret
                ? `${token.substr(0, 3)} ${token.substr(3)}`
                : 'decrypting...'
            }
          </span>
          <ProgressBar
            text={timeLeft.toString().padStart(2, '0')}
            percent={timeLeft / 30 * 100}
          />
        </div>
        <div id="ad-container" nav-selectable="true" nav-index="0" tabIndex="1"></div>
      </div>
      <Softkey
        left="Back"
        onKeyLeft={() => history.push('/list')}
        center={adFocused ? 'Go' : ''}
      />
    </>
  );

  function calculateTimeLeft() {
    return authenticator.timeRemaining();
  }
}