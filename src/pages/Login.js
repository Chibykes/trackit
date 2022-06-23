import {useState, useRef, useEffect, useContext} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import vgranite from '../static/vgranite.png';
import Splash from '../component/Splash';
import { AppContext } from '../context/AppContext';
import { useNavigate, useSearchParams } from 'react-router-dom';


const Login = (props) => {
    const navigate = useNavigate();
    
    //eslint-disable-next-line
    const [params, setParams] = useSearchParams();

    const [seePass, setSeePass] = useState(false);
    const [formData, setFormData] = useState({username: '', password: ''});
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    const { setUser, url, Toast, loadSplash, setLoadSplash } = useContext(AppContext);

    const submitData = (e) => {
        e.preventDefault();
        setLoadSplash(true);

        fetch(`${url}/auth`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(({status, msg, user}) => {
            if(status === 'success') {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                return navigate("/dashboard?status=success&msg=Login successful");
            }
            
            setLoadSplash(false);
            Toast('error', msg);
        })
        .catch(err => {
            Toast('error', 'An error occurred. Check Internet connection');
            console.error(err);
            setLoadSplash(false);
        })
        
    }
    
    useEffect(() => {
        if(params.get('status')) {
            Toast(params.get('status'), params.get('msg'))
            navigate('/');
        }
        
        setLoadSplash(false);
        return;
        // eslint-disable-next-line
    }, []);

    return (<> 
        {loadSplash && <Splash/>}
        <div className="grid place-content-center h-screen space-y-6">

            <img src={vgranite}
                alt="Vegis Logo"
                className="w-16 h-16 mx-auto"/>

                <p className="text-lg font-bold uppercase text-center">
                    Victory Granite
                </p>

            <form className="mx-auto space-y-3"
                onSubmit={submitData}>

                {/* <input type="text" placeholder="Username or ID"
                    ref={usernameRef}
                    className="block p-3 text-gray-600 bg-gray-100 rounded-lg w-72 text-sm"
                    value={
                        formData.username
                    }
                    onChange={
                        () => setFormData({
                            ...formData,
                            username: usernameRef.current.value
                        })
                    }/> */}

                <div className="flex text-gray-600 bg-gray-100 rounded-lg items-center lg:w-72">
                    <input 
                        type="text"
                        placeholder="Username"
                        ref={usernameRef}
                        className="block bg-transparent p-3 w-full text-sm rounded-lg"
                        value={formData.username}
                        onChange={() => setFormData({...formData, username: usernameRef.current.value})
                    }/>
                </div>
                <div className="flex text-gray-600 bg-gray-100 rounded-lg items-center lg:w-72">
                    <input type={
                            `${
                                !seePass ? 'password' : 'text'
                            }`
                        }
                        placeholder="Password"
                        ref={passwordRef}
                        className="block bg-transparent p-3 w-full text-sm rounded-lg"
                        value={formData.password}
                        onChange={() => setFormData({...formData,password: passwordRef.current.value})}
                    />
                    {!seePass ? 
                        <FaEye title="Show Password" className="mx-3" onClick={() => setSeePass(!seePass)}/> : <FaEyeSlash title="Hide Password" className="mx-3" onClick={() => setSeePass(!seePass)}/>
                } </div>

                <button className="
                    block bg-black text-white font-bold p-3 rounded-lg w-full text-sm
                  focus:bg-app-main focus:ring-2 ring-app-main ring-offset-2
                ">
                    Login
                </button>

            </form>

        </div>
    </>);

};

export default Login;
