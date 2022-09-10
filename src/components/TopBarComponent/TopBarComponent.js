import React, {useEffect, useState} from 'react';
import css from './TopBarComponent.module.css';
import {Outlet} from 'react-router-dom';

function TopBarComponent () {
  const [modeText, setModeText] = useState('Light Mode');
  return (
    <>
      <header className={css.container}>
        <h1>Where in the world?</h1>
        <div className={css.modeSwitcher}>
          <button>{modeText}</button>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default TopBarComponent;