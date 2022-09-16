import React, {useEffect, useState} from 'react';
import css from './TopBarComponent.module.css';
import {Outlet} from 'react-router-dom';

function TopBarComponent () {
  const root = document.querySelector(':root');

  const [colorModeReversed, setColorModeReversed] = useState(localStorage.getItem('colorMode') || 'Light Mode');

  const darkStylePreset = [
    {prop: "--col_appBackground", value: "hsl(207, 26%, 17%)"},
    {prop: "--col_elementsBackground", value: "hsl(209, 23%, 22%)"},
    {prop: "--col_elementsBackgroundHover", value: "hsl(208, 34%, 26%)"},
    {prop: "--col_text", value: "hsl(0, 0%, 100%)"},
    {prop: "--col_inputBackground", value: "hsl(207, 26%, 17%)"},
    {prop: "--col_textHover", value: "hsl(0, 0%, 66%)"}
  ];

  const lightStylePreset = [
    {prop: "--col_appBackground", value: "hsl(0, 0%, 98%)"},
    {prop: "--col_elementsBackground", value: "hsl(0, 0%, 100%)"},
    {prop: "--col_elementsBackgroundHover", value: "hsl(0, 0%, 92%)"},
    {prop: "--col_text", value: "hsl(200, 15%, 8%)"},
    {prop: "--col_inputBackground", value: "hsl(0, 0%, 52%)"},
    {prop: "--col_textHover", value: "hsl(0, 0%, 53%)"}
  ];

  const changeColorMode = () => {
    if (localStorage.getItem('colorMode') === "Light Mode") {
      lightStylePreset.forEach(item => root.style.setProperty(item.prop, item.value));
      localStorage.setItem('colorMode', 'Dark Mode');
      setColorModeReversed('Dark Mode');
    } else {
      darkStylePreset.forEach(item => root.style.setProperty(item.prop, item.value));
      localStorage.setItem('colorMode', 'Light Mode');
      setColorModeReversed('Light Mode');
    }
  };

  useEffect(() => {
    changeColorMode();
  }, []);

  return (
    <>
      <header className={css.container}>
        <div className={css.content}>
          <h1>Where in the world?</h1>
          <div className={css.modeSwitcher}>
            <button onClick={() => changeColorMode()}>{colorModeReversed}</button>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default TopBarComponent;