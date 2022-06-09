import {useEffect, useContext} from 'react';
import Splash from '../component/Splash';
import { AppContext } from '../context/AppContext';


const Logout = (props) => {

    const {url} = useContext(AppContext);

    useEffect(() => {
        fetch(`${url}/exit`, {credentials: 'include'}).then(res => res.json()).then(data => null);

        props.history.push('/?status=success&msg=Logout successful');
        
        // eslint-disable-next-line
    }, [])

    return (<>
        <Splash/>
    </>);

};

export default Logout;
