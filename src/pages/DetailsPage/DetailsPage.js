import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {fetchCountryData, fetchCodeData} from '../../api/api';
import css from './DetailsPage.module.css';
import {Link} from 'react-router-dom';



function DetailsPage (props) {
    let location = useLocation();
    let params = useParams();
    let navigate = useNavigate();

    const [data, setData] = useState();
    const [borderCountriesData, setBorderCountriesData] = useState([]);
    const {countryName} = params;

    const leftSideInfo = [
        {text: "NativeName", value: data ? Object.values(data.name.nativeName).map(item => item.common).join(", ") : ""},
        {text: "Population", value: data?.population},
        {text: "Region", value: data?.region},
        {text: "Sub-region", value: data?.subregion},
        {text: "Capital", value: data?.capital}
    ];
    const rightSideInfo = [
        {text: "Top Level Domain", value: data?.tld[0]},
        {text: "Currencies", value: data ? Object.values(data.currencies).map(item => item.name).join(", ") : ""},
        {text: "Languages", value: data ? Object.values(data.languages).map(item => item).join(", ") : ""}
    ];

    const fetchData = async () => {
        try {
            let mainCountryFetch;
            if (location.state?.data.name.common === countryName) setData(location.state.data);
            else {
                mainCountryFetch = await fetchCountryData(countryName);
                setData(mainCountryFetch);
            }
            const borderCountryFetch = await fetchCodeData(mainCountryFetch?.borders ?? location.state.data.borders);
            setBorderCountriesData(borderCountryFetch);
        } catch (err) {
            console.log(err);
            navigate("/page404", {state: {err: err, countryName: countryName}});
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, location]);

    return (
        <>
            <div className={css.container}>
                <div className={css.returnButtonContainer}>
                    <Link to="/"><button>Back to list</button></Link>
                </div>
                {data &&
                    <div className={css.innerContainer}>
                        <div className={css.flagContainer}>
                            <img src={data.flags.svg ?? data.flags.png} alt='' />
                        </div>
                        <div className={css.infoContainer}>
                            <h1>{data.name.common}</h1>
                            <div className={css.leftSideInfo}>
                                {leftSideInfo.map((item, index) => <p key={index}><span>{`${item.text}: `}</span> {item.value}</p>)
                                }
                            </div>
                            <div className={css.rightSideInfo}>
                                {rightSideInfo.map((item, index) => <p key={index}><span>{`${item.text}: `}</span> {item.value}</p>)
                                }
                            </div>
                            <div className={css.borderCountries}>
                                {borderCountriesData.map((item, index) => <Link to={`/${item.name.common.toLowerCase()}`} state={{data: item}} key={index}><button >{item.name.common}</button></Link>)}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default DetailsPage;