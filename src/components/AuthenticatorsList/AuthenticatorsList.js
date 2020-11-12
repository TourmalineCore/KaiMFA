import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header } from '../Header/Header';
import Softkey from '../Softkey/Softkey';
import { List } from '../List/List';
import {
  getAllAuthenticators,
  deleteAuthenticatorById
} from '../../services/authenticatorsProvider';
import { Dialog } from '../Dialog/Dialog';

class AuthenticatorsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticators: [],
      reload: false,
      showDeletionPopup: false,
    };
  }

  async componentDidMount() {
    const authenticators = await getAllAuthenticators();
    this.setState({
      authenticators,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.reload !== this.state.reload) {
      const authenticators = await getAllAuthenticators();
      this.setState({
        authenticators,
      });
    }
  }

  render() {
    const {
      authenticators,
      showDeletionPopup,
    } = this.state;

    const left = showDeletionPopup ? 'Cancel' : 'New';
    const onKeyLeft = showDeletionPopup ? () => this.setState({ showDeletionPopup: false }) : () => this.props.history.push('/new');

    const center = showDeletionPopup || !authenticators.length ? '' : 'Open';
    const onKeyCenter = showDeletionPopup ? undefined : this.onOpen;

    const right = showDeletionPopup ? 'Yes' : authenticators.length ? 'Delete' : '';
    const onKeyRight = showDeletionPopup ? this.deleteSelectedAuthenticator : this.onDelete;

    const sortedAuths = authenticators.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 

    return (
      <>
        <Header title="Authenticators" />
        <List
          authenticators={sortedAuths}
          navigationDisabled={showDeletionPopup}
        />
        {
          showDeletionPopup &&
          <Dialog
            title="Confirm"
            text={`Are you sure you want to delete ${this.getSelectedAuthenticator().name} authenticator?`}
          />
        }
        <Softkey
          left={left}
          onKeyLeft={onKeyLeft}
          center={center}
          onKeyCenter={onKeyCenter}
          right={right}
          onKeyRight={onKeyRight}
        />
      </>
    );
  }

  onOpen = (e) => {
    const {
      authenticators,
    } = this.state;

    if (!authenticators.length) {
      return;
    }

    const currentElement = document.querySelector("[nav-selected=true]");
    const currentNavigationIndex = parseInt(currentElement.getAttribute("nav-index"), 10);

    this.props.history.push(`/${authenticators[currentNavigationIndex].id}`);
  };

  onDelete = (e) => {
    const {
      authenticators,
    } = this.state;

    if (!authenticators.length) {
      return;
    }

    this.setState({
      showDeletionPopup: true,
    });
  };

  deleteSelectedAuthenticator = async (e) => {
    const selectedAuthenticator = this.getSelectedAuthenticator();
    
    await deleteAuthenticatorById(selectedAuthenticator.id);
    
    this.setState({
      reload: !this.state.reload,
      showDeletionPopup: false,
    });
  };

  getSelectedAuthenticator = () => {
    const currentIndex = parseInt(
      document.querySelector("[nav-selected=true]").getAttribute("nav-index"),
      10
    );

    const {
      authenticators,
    } = this.state;

    return authenticators[currentIndex];
  }
}

export default withRouter(AuthenticatorsList);