import {useState, useEffect, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {HiMenuAlt1} from 'react-icons/hi';

import { AppContext } from '../context/AppContext';
import Sidebar from '../component/Sidebar';
import Splash from '../component/Splash';
import formatMoney from '../utils/formatMoney';


const Debts = () => {

    
    const navigate = useNavigate();
    
    const { url, loadSplash, setLoadSplash, Toast } = useContext(AppContext);
    const [showSidebar, setShowSidebar] = useState(false);

    const { id } = useParams();

    const [salesData, setSalesData] = useState(null);
    const [balance, setBalance] = useState(0);

    const balancer = (e) => {
        if(isNaN(e.target.value)) return setBalance(0); 

        e.target.value > salesData?.balance ?
        setBalance(salesData?.balance) : setBalance(e.target.value);

        e.target.value < 0 && setBalance(0);
    }

    const handleResolve = () => {
        if(!balance) return Toast('error', 'Please specify amount to resolve');

        setLoadSplash(true);

        fetch(`${url}/resolve-debt`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                id,
                balance: salesData.balance - balance,
                amount: parseInt(salesData.amount) + parseInt(balance)
            })
        })
        .then(res => res.json())
        .then(({status, msg, user}) => {

            setLoadSplash(false);
            if(!user) return navigate('/?status=error&msg=Session expired');
            if(status === 'error'){
                return Toast(status, msg)
            }

            Toast('success', 'Debt successfully resolved');
            navigate(`/transactions/${id}`);

        })
        .catch(err => {
            setLoadSplash(false);
            Toast('error', 'An error occurred. Check Internet connection')
        });
    }



    useEffect(() => {
        setLoadSplash(true);
        const query = { id };
        
        fetch(`${url}/trx?query=${JSON.stringify(query)}`, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(({data, user}) => {

            setLoadSplash(false);
            if(!user) return navigate('/?status=error&msg=Session expired');

            setSalesData(data[0]);

        })
        .catch(err => {
            setLoadSplash(false);
            Toast('error', 'An error occurred. Check Internet connection')
        });

        return;

        // eslint-disable-next-line
    }, []);
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
                        Resolve Debts
                    </h1>
                </div>

                <div className="">

                    <div className="sticky top-0 py-4 bg-white">
                        <div className="p-3 bg-app-main rounded-lg shadow-lg">
                            <div className="text-white text-3xl text-center font-bold pb-1">&#8358; 
                                {formatMoney(salesData?.balance - balance)}
                            </div>
                            <p className="text-center text-white text-xs">Remaining Debt</p>
                        </div>
                    </div>


                    <div className="w-full py-5 space-y-5">

                        <div className="">
                            <p className="text-xs block pb-2">Sale ID</p>
                            <div className="text-xl capitalize font-bold">{salesData?.id}</div>
                        </div>
                        <div className="">
                            <p className="text-xs block pb-2">Customer Name</p>
                            <div className="text-xl capitalize font-bold">{salesData?.customer_name}</div>
                        </div>

                        <div className="">
                            <p className="text-xs block pb-2">Customer Phone</p>
                            <div className="text-xl capitalize font-bold">{salesData?.customer_phone}</div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs block pb-2">Items Bought</p>
                            {salesData?.sales?.map(({ product, qty, price, description }, index) =>
                                <div className="border border-app-light rounded-lg p-3" key={index+1}>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-12 space-y-1">
                                            <div className="text-[0.5rem] text-white w-4 h-4 mb-3 grid place-content-center font-bold rounded-full bg-black">
                                                {index+1}
                                            </div>
                                            <div className="flex justify-start items-center text-xs font-bold space-x-5">
                                                <span className="block w-1/4 text-xs text-gray-500 font-normal">Product: </span> 
                                                <div className="font-semibold text-xs">{product}</div>
                                            </div>
                                            <div className="flex justify-start items-center text-xs font-bold space-x-5">
                                                <span className="block w-1/4 text-xs text-gray-500 font-normal">Qty: </span> 
                                                <span>{qty}</span>
                                            </div>
                                            <div className="flex justify-start items-center text-xs font-bold space-x-5">
                                                <span className="block w-1/4 text-xs text-gray-500 font-normal">Price (per): </span> 
                                                <span>&#8358; {formatMoney(parseInt(price))}</span>
                                            </div>
                                            <div className="flex justify-start items-center text-xs font-bold space-x-5">
                                                <span className="block w-1/4 text-xs text-gray-500 font-normal">Description: </span> 
                                                <span>{description}</span>
                                            </div>
                                            <div className="text-xs font-bold space-x-5">
                                                <div className="text-app-main text-[16px] text-right">&#8358; {formatMoney(parseInt(price || 0) * parseInt(qty || 0))}</div>
                                                <div className="text-xs text-right font-normal">Total Price: </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="">
                            <p className="text-xs block pb-2">Amount Paid</p>
                            <div className="text-xl capitalize font-bold">&#8358;{formatMoney(salesData?.amount)}</div>
                        </div>

                        <div className="">
                            <p className="text-xs block pb-2">Amount Unpaid</p>
                            <div className="text-xl capitalize font-bold text-red-400">&#8358;{formatMoney(salesData?.balance)}</div>
                        </div>

                        <div className="">
                            <p className="text-xs block pb-2">Reference</p>
                            <div className="text-xl capitalize font-bold">{salesData?.reference}</div>
                        </div>

                        <div className="">
                            <p className="text-xs block pb-3">How much do you want to resolve?</p>

                            <div className="grid grid-cols-12 rounded-lg border border-app-main">
                                <div className="col-span-10">
                                    <input 
                                        type="number"
                                        className="block w-full p-2 px-3"
                                        placeholder="How much do you want to clear?"
                                        onChange={balancer}
                                        min={0}
                                        max={salesData?.balance}
                                        value={balance}
                                    />
                                </div>
                                <div className="col-span-2 grid place-content-center w-full" 
                                    onClick={() => setBalance(salesData?.balance)}
                                >
                                    <span className="text-[.625rem] font-bold block w-full text-app-main cursor-pointer">All</span>
                                </div>
                            </div>
                        </div>


                        <div className="">
                            <button type="text" className="p-3 bg-app-main text-white text-sm rounded-lg block w-full font-bold" onClick={handleResolve}>
                                Resolve
                            </button>
                        </div>

                    </div>

                </div>


            </div>

        </div>
    </>);


};

export default Debts;
