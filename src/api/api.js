import axios from 'axios';

const fetchAllData = async () => {
    try {
        const res = await axios.get('https://restcountries.com/v3.1/all');
        return res.data;
    } catch (err) {
        throw err;
    }
};

const fetchCountryData = async (countryName) => {
    try {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        return res.data[0];
    } catch (err) {
        throw err;
    }
};

const fetchCodeData = async (codeArray) => {
    try {
        if (!codeArray || codeArray.length === 0) return [];
        const res = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${codeArray.join(",")}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export {fetchAllData, fetchCountryData, fetchCodeData};