import React from 'react';
import {Link} from 'react-router-dom';
import css from './CountryComponent.module.css';

function CountryComponent (props) {
  return (
    <>
      <Link to={`/${props.data.name.common.toLowerCase()}`} state={{data: props.data}} className={css.container + " " + props.class} >
        <div className={css.flagContainer}>
          <img src={props.data.flags.svg ?? props.data.flags.png} alt='' />
        </div>
        <div className={css.additionalInfo}>
          <p>{props.data.name.common}</p>
          <p><span>Population: </span>{props.data.population}</p>
          <p><span>Region: </span>{props.data.region}</p>
          <p><span>Capital: </span>{props.data.capital}</p>
        </div>
      </Link>
    </>
  );
}

export default CountryComponent;