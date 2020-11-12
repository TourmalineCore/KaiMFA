import React from 'react';
import css from './Softkey.module.css';

class Softkey extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {
      left,
      onKeyLeft,
      center,
      onKeyCenter,
      right,
      onKeyRight
    } = this.props;

    return (
      <div className={css.softkey}>
        <label className={css.left} onClick={onKeyLeft}>{left}</label>
        <label className={css.center} onClick={(evt) => onKeyCenter && onKeyCenter(evt)}>{center}</label>
        <label className={css.right} onClick={onKeyRight}>{right}</label>
      </div>
    );
  }

  handleKeyDown = evt => {

    const {
      onKeyLeft,
      onKeyCenter,
      onKeyRight
    } = this.props;

    switch (evt.key) {
      case 'SoftLeft':
        return onKeyLeft && onKeyLeft(evt);
      case 'Enter':
        return onKeyCenter && onKeyCenter(evt);
      case 'SoftRight':
        return onKeyRight && onKeyRight(evt);
      default:
        return;
    }
  };
};

export default Softkey;
