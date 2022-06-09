import { useState } from 'react';

const useFetch = (url, opt) => {

    const [ apiData, setApiData ] = useState({  })

    fetch(url, {
        method: opt.method || 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(opt.body),
    })
    .then(res => res.json())
    .then(data => {
        setApiData(data);
    })
    .catch(err => {
        setApiData({
            status: 'error',
            msg: 'Failed to retrieve data',
            data: err
        });
    });

    return apiData
}

export default useFetch;