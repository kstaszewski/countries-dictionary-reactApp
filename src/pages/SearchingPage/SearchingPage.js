import React, {useEffect, useRef, useState} from 'react';
import css from './SearchingPage.module.css';
import CountryComponent from '../../components/CountryComponent/CountryComponent';
import {fetchAllData} from '../../api/api';

function SearchingPage () {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('all');
    const filterByRegionRef = useRef(null);

    useEffect(() => {
        const selector = filterByRegionRef.current;
        selector.addEventListener('mousedown', e => {
            e.preventDefault();
        });
        const fetchData = async () => {
            const res = await fetchAllData();
            setData(res);
            setFilteredData(res);
            console.log(res);
        };
        fetchData();
    }, []);

    const handleSelectRegionClick = e => {
        const controller = new AbortController();
        const selector = filterByRegionRef.current;
        if (window.innerWidth >= 420) {// override look for non mobile
            const select = selector.children[0];
            const dropDown = document.createElement('ul');
            dropDown.className = css.selectorOptions;

            [...select.children].forEach(option => {
                const dropDownOption = document.createElement('li');
                dropDownOption.textContent = option.textContent;

                dropDownOption.addEventListener('mousedown', (e) => {
                    e.stopPropagation();
                    select.value = option.value;
                    selector.value = option.value;
                    console.log(option.value);
                    setSelectedRegion(option.value);
                    handleSelectRegionChange(option.value);
                    dropDown.remove();
                    controller.abort();
                });
                dropDown.appendChild(dropDownOption);
            }, {signal: controller.signal});
            selector.appendChild(dropDown);

            document.addEventListener('click', (e) => {
                if (!selector.contains(e.target)) {
                    dropDown.remove();
                    controller.abort();
                }
            }, {signal: controller.signal});
        }
    };

    const handleSelectRegionChange = chosenRegion => {
        if (chosenRegion === 'all') return setFilteredData(data);
        setFilteredData(data.filter(el => el.region.toLowerCase() === chosenRegion));
    };

    return (
        <>
            <div className={css.container}>
                <div className={css.inputs}>
                    <div className={css.inputContainer}>
                        <input placeholder='Search for a country...'></input>
                    </div>
                    {/* <div className={css.selectContainer}> */}
                    <label ref={filterByRegionRef} className={css.customSelect} onClick={e => handleSelectRegionClick(e)}>
                        <select >
                            <option value="all">{selectedRegion === 'all' ? "Filter by Region" : "All"}</option>
                            <option value="africa">Africa</option>
                            <option value="americas">America</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="oceania">Oceania</option>
                        </select>
                    </label>
                    {/* </div> */}
                </div>
                <div className={css.countriesList}>
                    {filteredData.length > 0 &&
                        filteredData.map((country, index) => {
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