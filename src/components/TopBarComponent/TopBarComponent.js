import React, {useEffect, useState} from 'react';
import css from './TopBarComponent.module.css';
import {Outlet} from 'react-router-dom';

function TopBarComponent () {
  const [modeText, setModeText] = useState('Light Mode');
  return (
    <>
      <header className={css.container}>
        <div className={css.content}>
          <h1>Where in the world?</h1>
          <div className={css.modeSwitcher}>
            <button>{modeText}</button>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default TopBarComponent;