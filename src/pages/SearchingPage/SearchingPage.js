import React, {useEffect, useState} from 'react';
import css from './SearchingPage.module.css';
import CountryComponent from '../../components/CountryComponent/CountryComponent';
import {fetchAllData} from '../../api/api';

function SearchingPage () {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchAllData();
            setData(res);
            console.log(res);
        };
        fetchData();
    }, []);

    return (
        <>
            <div className={css.container}>
                <div className={css.inputs}>
                    <input></input>
                    <select></select>
                </div>
                <div className={css.countriesList}>
                    {data.length > 0 &&
                        data.map((country, index) => {
                            return (
                                <CountryComponent
                                    id={index}
                                    key={index}
                                    class={css.CountryComponent}
                                    data={country}
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default SearchingPage;