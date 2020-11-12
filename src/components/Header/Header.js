import React from 'react'
import css from './Header.module.css';

export const Header = ({ title }) => {
  return (
    <header className={css.header}>
      <span data-cy="header">{title}</span>
    </header>
  )
}
