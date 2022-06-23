import {useState, useEffect, useContext} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {HiMenuAlt1} from 'react-icons/hi';
import {BiTrash} from 'react-icons/bi';
import {BsReceipt} from 'react-icons/bi';
import {MdOutlineMoneyOffCsred} from 'react-icons/md';

import { AppContext } from '../context/AppContext';
import Sidebar from '../component/Sidebar';
import Splash from '../component/Splash';
import formatMoney from '../utils/formatMoney';


const SingleTransaction = () => {

    
    const navigate = useNavigate();
    
    const { url, user, setUser, loadSplash, setLoadSplash, Toast } = useContext(AppContext);
    const [showSidebar, setShowSidebar] = useState(false);

    const { id } = useParams();

    const [singleTrx, setSingleTrx] = useState({});



    useEffect(() => {
        setLoadSplash(true);
        const query = {
            id
        }
        
        fetch(`${url}/trx?query=${JSON.stringify(query)}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(({data, user}) => {
            setLoadSplash(false);
            if(!user) return navigate('/?status=error&msg=Session expired');
            
            setUser(user);
            setSingleTrx(data[0]);
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
                        Transc.- {id}
                    </h1>
                </div>

                <div className="">

                    {/* <div className="sticky top-0 py-4 bg-white">
                        <div className="p-3 bg-app-main rounded-lg shadow-lg">
                            <div className="text-white text-3xl text-center font-bold pb-1">&#8358; 
                                {formatMoney(singleTrx?.balance - balance)}
                            </div>
                            <p className="text-center text-white text-xs">Remaining Debt</p>
                        </div>
                    </div> */}
                    <div className="grid grid-cols-4 justify-items-end gap-5">
                        {parseInt(singleTrx?.balance) !== 0 &&
                            <div className="grid place-content-center p-2 grid-cols-1 gap-1 rounded-md bg-purple-50" onClick={() => navigate(`/debts/${singleTrx.id}`)}>
                                <div className="h-6 w-6 m-0 mx-auto grid place-content-center">
                                    <MdOutlineMoneyOffCsred className="text-app-main" />
                                </div>
                                <div className="text-[.625rem] text-app-main">Resolve Debt</div>
                            </div>
                        }

                        {user?.role !== "staff" && 
                        <>
                            <div className="grid place-content-center p-2 grid-cols-1 gap-1 rounded-md bg-sky-50" onClick={() => delete(singleTrx?.id)}>
                                <div className="h-6 w-6 m-0 mx-auto grid place-content-center">
                                    <BiTrash className="text-sky-500" />
                                </div>
                                <div className="text-[.625rem] text-sky-500">Edit</div>
                            </div>
                            <div className="grid place-content-center p-2 grid-cols-1 gap-1 rounded-md bg-red-50" onClick={() => delete(singleTrx?.id)}>
                                <div className="h-6 w-6 m-0 mx-auto grid place-content-center">
                                    <BiTrash className="text-red-500" />
                                </div>
                                <div className="text-[.625rem] text-red-500">Delete</div>
                            </div>
                            <div className="grid place-content-center p-2 grid-cols-1 gap-1 rounded-md bg-green-50" onClick={() => navigate(`/receipt/${id}`)}>
                                <div className="h-6 w-6 m-0 mx-auto grid place-content-center">
                                    <BiTrash className="text-green-500" />
                                </div>
                                <div className="text-[.625rem] text-green-500">View Receipt</div>
                            </div>
                        </>
                        }
                    </div>


                    <div className="w-full py-5 space-y-5">

                        <div className="">
                            <p className="text-xs block pb-2">Transaction Type</p>
                            <div className="text-xl capitalize font-bold">{singleTrx?.type === 'sales'? 'Sale' : 'Spendings'}</div>
                        </div>
                        <div className="">
                            <p className="text-xs block pb-2">Sale ID</p>
                            <div className="text-xl capitalize font-bold">{singleTrx?.id}</div>
                        </div>

                        {
                            singleTrx?.type === 'sales' && 
                            <>
                                <div className="">
                                    <p className="text-xs block pb-2">Customer Name</p>
                                    <div className="text-xl capitalize font-bold">{singleTrx?.customer_name}</div>
                                </div>

                                <div className="">
                                    <p className="text-xs block pb-2">Customer Phone</p>
                                    <div className="text-xl capitalize font-bold">{singleTrx?.customer_phone}</div>
                                </div>
                            </>
                        }

                        <div className="space-y-3">
                            <p className="text-xs block pb-2">Items Bought</p>
                            {singleTrx?.sales?.map(({ product, qty, price, description }, index) =>
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


                        {
                            singleTrx?.type === 'sales' ? 
                            <>
                                <div className="">
                                    <p className="text-xs block pb-2">Discount</p>
                                    <div className="text-xl capitalize font-bold">&#8358;{formatMoney(singleTrx?.discount)}</div>
                                </div>

                                <div className="">
                                    <p className="text-xs block pb-2">Amount Paid</p>
                                    <div className="text-xl capitalize font-bold text-green-400">+ &#8358;{formatMoney(singleTrx?.amount)}</div>
                                </div>

                                <div className="">
                                    <p className="text-xs block pb-2">Payment Method</p>
                                    <div className="text-xl capitalize font-bold">{singleTrx?.payment_method}</div>
                                </div>

                                <div className="">
                                    <p className="text-xs block pb-2">Amount Unpaid</p>
                                    <div className="text-xl capitalize font-bold text-red-400">- &#8358;{formatMoney(singleTrx?.balance)}</div>
                                </div>
                            </>
                            :
                            <div className="">
                                <p className="text-xs block pb-2">Amount Spent</p>
                                <div className="text-xl capitalize font-bold text-red-400">+ &#8358;{formatMoney(singleTrx?.amount)}</div>
                            </div>

                        }

                        <div className="">
                            <p className="text-xs block pb-2">Reference</p>
                            <div className="text-xl capitalize font-bold">{singleTrx?.reference}</div>
                        </div>

                        {/* <div className="">
                            <Link to={`/receipt/${id}`} type="text" className="p-3 bg-app-main text-white text-sm rounded-lg block w-full font-bold">
                                Show Receipt
                            </Link>
                        </div> */}

                    </div>

                </div>


            </div>

        </div>
    </>);


};

export default SingleTransaction;
