import {createContext, useState} from 'react';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const url = 'http://localhost:8080/api' || 'https://vegis-receipt-backend.herokuapp.com/api';
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [loadSplash, setLoadSplash] = useState(false);

    const Toast = (type, msg) => {
        Toastify({
            text: msg,
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: `${type}-toast text-xs`
        }).showToast();
    }

    return(
        <AppContext.Provider value={{ user, setUser, url, loadSplash, setLoadSplash, Toast }}>
            {children}
        </AppContext.Provider>
    );
}

export {AppContext, AppProvider};