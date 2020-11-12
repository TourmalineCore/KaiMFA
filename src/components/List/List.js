import React, { useEffect } from 'react';
import css from './List.module.css';
import { useWindowDimensions } from '../useWindowDimensions';
import { useNavigation } from '../../hooks/useNavigation';

export const List = ({
  authenticators,
  navigationDisabled,
}) => {
  const {
    height,
  } = useWindowDimensions();

  // eslint-disable-next-line no-unused-vars
  const [current, setNavigation] = useNavigation(!navigationDisabled);

  useEffect(() => {
    setNavigation(0);
    // setNavigation(currentIndex === 0 ? 0 : currentIndex - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticators.length]);

  if (authenticators === undefined || !authenticators.length) {
    return (
      <div
        className="content"
        style={{
          height: `${height - 30}px`
        }}
      >
        <div className="message" style={{marginTop: '10px'}}>No authenticators are created yet. You can press left key at the bottom of the screen to go to the authenticator creation page.</div>
      </div>
    );
  };


  return (
    <div
      className="content"
      style={{
        height: `${height - 30}px`
      }}
    >
      <div className={css.list}>
        {authenticators.map((authenticator, index) => (
          <span
            nav-selectable="true"
            key={index}
            className={`${css.todo}`}>
            {authenticator.name}
          </span>
        ))}
      </div>
    </div>
  )
}

