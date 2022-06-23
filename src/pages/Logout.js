import {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router';
import Splash from '../component/Splash';
import { AppContext } from '../context/AppContext';


const Logout = (props) => {

    const {url} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${url}/exit`, {credentials: 'include'}).then(res => res.json()).then(data => null);

        navigate('/?status=success&msg=Logout successful');
        
        // eslint-disable-next-line
    }, [])

    return (<>
        <Splash/>
    </>);

};

export default Logout;
