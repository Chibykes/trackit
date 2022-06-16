import {useState, useEffect, useContext} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import { MdQrCodeScanner, MdOutlineMoneyOffCsred } from 'react-icons/md';
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { HiMenuAlt1, HiUserGroup } from 'react-icons/hi';
import { BsReceipt } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { AiFillPieChart, AiOutlineFileSearch } from 'react-icons/ai';

import Sidebar from '../component/Sidebar';
import Splash from '../component/Splash';
import Trx from '../component/Trx';
import formatMoney from '../utils/formatMoney';

import { AppContext } from '../context/AppContext';

const Dashboard = (props) => {

    const [showSidebar, setShowSidebar] = useState(false);
    const [trxs, setTrxs] = useState([]);
    const [dailyVolume, setDailyVolume] = useState([]);
    const { user, url, loadSplash, setLoadSplash, Toast, setUser } = useContext(AppContext);

    const navigate = useNavigate();

    // eslint-disable-next-line
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        setLoadSplash(true);
            
        fetch(`${url}/trx?limit=5&date=0`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(({data, specificTrx, user}) => {
            if(!user){
                setLoadSplash(false);
                return navigate('/?status=error&msg=Session expired');
            }

            setTrxs(data);
            setUser(user);
            if(specificTrx.length > 0) setDailyVolume(specificTrx);

            if(params.get('status') === 'success'){
                Toast('success', params.get('msg'));
                navigate('/dashboard');
            }
            
            setLoadSplash(false);
        })
        .catch(err => {
            setLoadSplash(false);
            Toast('error', 'An error occurred. Check Internet connection')
            navigate('/dashboard');
        })

        return;
        
        // eslint-disable-next-line
    }, []);

    return (<> 
        {loadSplash && <Splash/>}

        <div className="lg:flex lg:w-1/2 w-full mx-auto">

            <Sidebar showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            
            {/* Main */}
            <div className="p-5 lg:w-4/6 w-full space-y-8 lg:px-10 px-5 mx-auto border-r border-l border-gray-50 print:border-transparent"> {/* Header */}
                <div className="flex justify-between items-center"> {
                    !showSidebar ? 
                        <HiMenuAlt1 onClick={
                            () => setShowSidebar(!showSidebar)
                        }
                        className=""
                        title=""
                        /> 
                        :
                        <FaTimes className="" onClick={
                            () => setShowSidebar(!showSidebar)
                        }/>
                }

                    <h1 className="font-bold capitalize">
                        Hi, { user && user.username}
                    </h1>

                    <Link to="/scan">
                        <MdQrCodeScanner className="text-app-main animate-pulse" title="Scan a Reciept"/>
                    </Link>
                </div>


                {/* Overview */}
                <div className="bg-black p-4 text-white divide-x divide-gray-400 flex text-center rounded-xl">
                    <div className="p-3 flex-initial w-2/3 flex-grow-2">
                        {user?.role !== 'staff' ? 
                            <h1 className="font-bold text-3xl">
                                &#8358; {
                                    dailyVolume.length > 0 ? formatMoney(dailyVolume.reduce((t, d) => {
                                        return t += d.amount
                                    }, 0)) : 0
                                }
                            </h1>
                            :
                            <h1 className="font-bold text-3xl">
                                &#8358; **,***
                            </h1>
                        }
                        <p className="text-xs pt-2"
                            style={
                                {fontSize: '0.6rem'}
                        }>
                            * Today's Trx. Volume
                        </p>
                    </div>
                    <div className="p-3 flex-initial w-1/3">
                        <h1 className="font-bold text-3xl"> {
                            dailyVolume.length
                        } </h1>
                        <p className="text-xs pt-2"
                            style={
                                {fontSize: '0.6rem'}
                        }>
                            * Today's Trx.
                        </p>
                    </div>
                </div>


                {/* Services */}
                <div className="w-full overflow-hidden">
                    <h1 className="text-xs text-app-main rounded inline font-bold">
                        Tools
                    </h1>
                    <div className="flex flex-wrap py-5">
                        
                            <Link to="/sales" className="flex justify-start items-center w-1/2 my-2 py-2
                                hover:bg-gray-50 rounded-lg
                            ">
                                <GiReceiveMoney className="text-app-main text-xl"/>
                                <div className="px-3 space-y-1">
                                    <p className="text-left text-sm font-bold">
                                        Sales
                                    </p>
                                    <p className="text-left text-xs text-gray-400">
                                        Record new sale
                                    </p>
                                </div>
                            </Link>
                        

                        
                            <Link to="/spendings" className="flex justify-start items-center w-1/2 my-2 py-2
                                hover:bg-gray-50 rounded-lg
                            ">
                                <GiPayMoney className="text-app-main text-xl"/>
                                <div className="px-3 space-y-1">
                                    <p className="text-left text-sm font-bold">
                                        Spendings
                                    </p>
                                    <p className="text-left text-xs text-gray-400">
                                        Record expenses
                                    </p>
                                </div>
                            </Link>
                        


                        
                            <Link to="/transactions" className="flex justify-start items-center w-1/2 my-2 py-2
                                hover:bg-gray-50 rounded-lg
                            ">
                                <BsReceipt className="text-app-main text-xl"/>
                                <div className="px-3 space-y-1">
                                    <p className="text-left text-sm font-bold">
                                        Transactions
                                    </p>
                                    <p className="text-left text-xs text-gray-400">
                                        All Transc. History
                                    </p>
                                </div>
                            </Link>
                        

                        
                            <Link to="/resolve-debts" className="flex justify-start items-center w-1/2 my-2 py-2
                                hover:bg-gray-50 rounded-lg
                            ">
                                <MdOutlineMoneyOffCsred className="text-app-main text-xl"/>
                                <div className="px-3 space-y-1">
                                    <p className="text-left text-sm font-bold">
                                        Resolve Debt
                                    </p>
                                    <p className="text-left text-xs text-gray-400">
                                        Clear customer debts
                                    </p>
                                </div>
                            </Link>
                        

                        
                            <Link to="/new-staff" className="flex justify-start items-center w-1/2 my-2 py-2
                                hover:bg-gray-50 rounded-lg
                            ">
                                <HiUserGroup className="text-app-main text-xl"/>
                                <div className="px-3 space-y-1">
                                    <p className="text-left text-sm font-bold">
                                        Staffs
                                    </p>
                                    <p className="text-left text-xs text-gray-400">
                                        Add New Staffs
                                    </p>
                                </div>
                            </Link>
                        

                        
                            <Link to="/scan" className="flex justify-start items-center w-1/2 my-2 py-2
                                hover:bg-gray-50 rounded-lg
                            ">
                                <MdQrCodeScanner className="text-app-main text-xl"/>
                                <div className="px-3 space-y-1">
                                    <p className="text-left text-sm font-bold">
                                        Scan
                                    </p>
                                    <p className="text-left text-xs text-gray-400">
                                        Scan receipts
                                    </p>
                                </div>
                            </Link>
                        

                    </div>
                </div>


                {/* Transacion Table */}
                <div className="">
                    <h1 className="text-xs text-app-main rounded inline font-bold">
                        Transactions
                    </h1>
                    
                    <div className="pt-3 relative overflow-hidden"> 
                    {
                        trxs.length > 0 ? 
                        trxs.map(trx => <Trx {...trx} key={trx.id}/>) :
                        <div className="grid place-content-center py-16">
                            <AiOutlineFileSearch className="text-black text-3xl text-center w-full" />
                            <p className="text-black text-center text-xs font-bold pt-3">
                                No Transaction <br/> Found
                            </p>
                        </div>
                    }
                        {trxs.length > 3 && <div className="absolute bottom-0 w-full h-52 bg-gradient-to-b from-transparent via-white to-white translate-y-20"></div>} 
                    </div>

                    <Link to="/transactions" 
                        className="block w-1/5 mx-auto mt-3 px-4 py-1 border border-app-main text-app-main 
                        font-bold text-xs shadow-sm rounded-md text-center hover:bg-app-main hover:text-white
                    ">
                        More
                    </Link>

                </div>

            </div>

        </div>
    </>);


};

export default Dashboard;
