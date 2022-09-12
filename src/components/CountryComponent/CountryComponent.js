import React from 'react';
import css from './CountryComponent.module.css';

function CountryComponent (props) {
  return (
    <>
      <div className={css.container + " " + props.class} onClick={props.onClick}>
        <div className={css.flagContainer}>
          <img src={props.data.flags.svg ?? props.data.flags.png} alt='' />
        </div>
        <div className={css.additionalInfo}>
          <p>{props.data.name.common}</p>
          <p><span>Population: </span>{props.data.population}</p>
          <p><span>Region: </span>{props.data.region}</p>
          <p><span>Capital: </span>{props.data.capital}</p>
        </div>
      </div>
    </>
  );
}

export default CountryComponent;