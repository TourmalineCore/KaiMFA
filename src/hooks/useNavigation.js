import { useState, useEffect } from 'react';

export const useNavigation = (enable = true) => {
  useEffect(() => {
    setNavigation(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enable]);

  const [current, setCurrent] = useState({ type: null, index: null });

  const getAllElements = () => document.querySelectorAll('[nav-selectable]');

  const getTheIndexOfTheSelectedElement = () => {
    const element = document.querySelector('[nav-selected=true]');
    return element ? parseInt(element.getAttribute('nav-index')) : 0;
  }

  const setNavigation = index => selectElement(getAllElements()[index] || document.body);

  const onKeyDown = evt => {
    if (!enable) {
      return;
    }

    if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp') return;

    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();

    let setIndex;
    switch (evt.key) {
      case 'ArrowDown':
        const goToFirstElement = currentIndex + 1 > allElements.length - 1;
        setIndex = goToFirstElement ? 0 : currentIndex + 1;
        return selectElement(allElements[setIndex] || allElements[0], setIndex);
      case 'ArrowUp':
        const goToLastElement = currentIndex === 0;
        setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
        return selectElement(allElements[setIndex] || allElements[0], setIndex);
      default:
        break;
    }
  }

  const selectElement = (selectElement, setIndex = 0) => {
    if (selectElement) {
      [].forEach.call(getAllElements(), (element, index) => {
        const selectThisElement = element && index === setIndex;
        element.setAttribute("nav-selected", element === selectElement);
        element.setAttribute("nav-index", index);
        if (selectThisElement) {
          element.scrollIntoView(false);
          if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            element.focus();
          } else {
            element.blur();
          }
        }
      });
      setCurrent({ type: selectElement.tagName, index: setIndex });
    } else {
      setNavigation(0);
    }
  }

  return [current, setNavigation];
};
