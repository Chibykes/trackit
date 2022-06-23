import {useState, useRef, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {HiMenuAlt1} from 'react-icons/hi';
import Splash from '../component/Splash';
import Sidebar from '../component/Sidebar';
import { AppContext } from '../context/AppContext';
import SalesDetails from '../component/SalesDetails';

const Spendings = () => {

    const { url, loadSplash, setLoadSplash, Toast } = useContext(AppContext);
    const [showSidebar, setShowSidebar] = useState(false);
    const [modalClose, setModalClose] = useState(true);
    const [sales, setSales] = useState([]);

    const [formData, setFormData] = useState({
        amount: '',
        description: ''
    });

    const amountRef = useRef(null);
    const descriptionRef = useRef(null);

    const navigate = useNavigate();

    const submitData = (e) => {
        e.preventDefault();
        setLoadSplash(true);
        
        fetch(`${url}/new-spendings`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({...formData, sales})
        })
        .then(res => res.json())
        .then(({data}) => {
            setLoadSplash(false);
            Toast('success','Expenses Added');
            navigate(`/transactions/${data.id}`);
        })
        .catch(err => {
            Toast('error','An error occurred. Check Internet connection');
            setLoadSplash(false);
        })
    }

    // useEffect(() => {
    //     fetch(`${url}/user`, {credentials: 'include'})
    //     .then(res => res.json())
    //     .then(data => {
    //         setLoadSplash(false);
    //     });

    //     return null;

    //     // eslint-disable-next-line
    // }, []);

    return (
    <> 
        {loadSplash && <Splash/>}
        <div className="lg:flex lg:w-1/2 w-full mx-auto">

            <Sidebar showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                /> {/* Main */}
            <div className="p-5 lg:w-4/6 w-full space-y-8 lg:px-10 px-5 mx-auto border-r border-l border-gray-50 print:border-transparent"> {/* Header */}
                <div className="flex justify-between items-center">
                    <HiMenuAlt1 onClick={
                            () => setShowSidebar(!showSidebar)
                        }
                        className=""
                        title=""/>

                    <h1 className="font-bold">
                        Spendings
                    </h1>
                </div>

                <div className="">

                    <p className="text-center text-gray-400 w-full"
                        style={
                            {fontSize: '.625rem'}
                    }>
                        This page is to record spendings (i.e funds spent by the firm). To record payments &nbsp;
                        <Link to="/sales" className="text-app-main font-bold">
                            Click here
                        </Link>
                    </p>

                    <form className="w-full py-5 space-y-5"
                        onSubmit={submitData}>

                        <SalesDetails 
                            sales={sales} 
                            setSales={setSales} 
                            modalClose={modalClose} 
                            setModalClose={setModalClose}
                            spendings
                        />

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Amount Spent
                            </label>
                            <input type="number" placeholder="Total Amount Spent" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                ref={amountRef}
                                onChange={
                                    () => setFormData({
                                        ...formData,
                                        amount: amountRef.current.value
                                    })
                                }/>
                        </div>

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Transaction Description
                            </label>
                            <textarea type="text" placeholder="A short description about transaction" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full resize-none h-24"
                                ref={descriptionRef}
                                onChange={
                                    () => setFormData({
                                        ...formData,
                                        description: descriptionRef.current.value
                                    })
                            }></textarea>
                        </div>

                        <div className="">
                            <button type="text" className="p-3 bg-app-main text-white text-sm rounded-lg block w-full font-bold">
                                Submit
                            </button>
                        </div>

                    </form>

                </div>


            </div>

        </div>
    </>);


};

export default Spendings;
