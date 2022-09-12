import axios from 'axios';
import React from 'react';

const fetchAllData = async () => {
    const res = await axios.get('https://restcountries.com/v3.1/all');
    return res.data;
};

export {fetchAllData};