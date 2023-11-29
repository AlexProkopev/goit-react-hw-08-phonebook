import React from 'react';

import css from './BtnComponent.module.css';



const BtnComponent = ({ children,hendlerClick,classNames }) => {

  return (
    <>
      <button
        type="button"
        onClick={hendlerClick}
        className={css[classNames]}
        aria-label="Log out"
      >
        {children}
      </button>
    </>
  );
};

export default BtnComponent;
