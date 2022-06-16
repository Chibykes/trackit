import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import {HiMenuAlt1} from 'react-icons/hi';
import {IoPrint} from 'react-icons/io5';
import {IoIosSend} from 'react-icons/io';
import {AiOutlineFileSearch} from 'react-icons/ai';
import QRCode from "react-qr-code";

import Splash from '../component/Splash';
import Sidebar from '../component/Sidebar';
import vgranite from "../static/vgranite.png";
import formatDate from "../utils/formatDate";
import formatMoney from "../utils/formatMoney";
import { AppContext } from '../context/AppContext';


const Receipt = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { url, loadSplash, setLoadSplash, Toast } = useContext(AppContext);
    const [receipt, setReceipt] = useState({ });
    const [showSidebar, setShowSidebar] = useState(false);

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
            
            setReceipt(data[0]);
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
            {loadSplash && <Splash />}
            <div className="lg:flex lg:w-1/2 w-full mx-auto">

                <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}  />


                {/* Main */}
                <div className="p-5 lg:w-4/6 w-full space-y-8 lg:px-10 px-5 mx-auto border-r border-l border-gray-50 print:border-transparent">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <HiMenuAlt1 onClick={() => setShowSidebar(!showSidebar)} className="" title="" />

                        <h1 className="font-bold">
                            Receipt
                        </h1>
                    </div>


                    {/* <RTP filename={`VegisReceipt Transaction-${receipt.id}`} x={20} y={20}>
                        {({toPdf, targetRef}) => (
                        )}
                    </RTP>  */}


                    <div className="">
                        { receipt ?
                            <div className="space-y-3" >

                                {parseInt(receipt?.balance) !== 0 && 
                                    <div className="print:hidden flex justify-end">
                                        <div className="font-bold text-xs text-white space-x-1 p-1 px-3 bg-app-main flex justify-between items-center rounded-md active:ring-purple-400 ring-transparent ring-2 ring-offset-2 cursor-pointer" onClick={() => navigate(`/debts/${receipt.id}`)}>
                                            <span>Resolve Debt</span>
                                        </div>
                                    </div>
                                }

                                <div className="py-3 flex justify-between items-center">
                                    <div className="">
                                        <img src={vgranite} alt="" className="w-14 h-14"/>
                                        <p className="text-lg font-bold uppercase">
                                            Victory <br /> Granite
                                        </p>
                                    </div>

                                    <div className="">
                                        {receipt.id && <QRCode className="mx-auto" size={96} value={receipt.id} />}

                                        <h1 className="pt-3 text-xl font-bold text-app-main text-center">{receipt.id && receipt.id}</h1>
                                    </div>
                                </div>



                                <div className="">
                                    {receipt.type === 'sales' && 
                                        <div className="flex flex-wrap justify-center items-center border-b border-dashed border-zinc-400 py-3" style={{textTransform: 'capitalize'}}>
                                            <h1 className="text-app-main w-1/2 font-bold" style={{ fontSize: '.625rem' }}>Customer Name</h1>
                                            <h1 className="text-sm w-1/2 text-right">{receipt.customer_name ? receipt.customer_name : '-'}</h1>
                                        </div>
                                    }
                                    {receipt.type === 'sales' && 
                                        <div className="flex flex-wrap justify-center items-center border-b border-dashed border-zinc-400 py-3" style={{textTransform: 'capitalize'}}>
                                            <h1 className="text-app-main w-1/2 font-bold" style={{ fontSize: '.625rem' }}>Customer Phone</h1>
                                            <h1 className="text-sm w-1/2 text-right">{receipt.customer_phone ? receipt.customer_phone : '-'}</h1>
                                        </div>
                                    }
                                
                                
                                    <div className="flex flex-wrap justify-center items-center border-b border-dashed border-zinc-400 py-3" style={{textTransform: 'capitalize'}}>
                                        <h1 className="text-app-main w-1/2 font-bold" style={{ fontSize: '.625rem' }}>Reference</h1>
                                        <h1 className="text-sm w-1/2 text-right">{receipt.reference ? receipt.reference : '-'}</h1>
                                    </div>
                                
                                    <div className="flex flex-wrap justify-center items-center border-b border-dashed border-zinc-400 py-3" style={{textTransform: 'capitalize'}}>
                                        <h1 className="text-app-main w-1/2 font-bold" style={{ fontSize: '.625rem' }}>Description</h1>
                                        <h1 className="text-sm w-1/2 text-right">{receipt.description ? receipt.description : '-'}</h1>
                                    </div>
                                
                                    <div className="flex flex-wrap justify-center items-center border-b border-dashed border-zinc-400 py-3" style={{textTransform: 'capitalize'}}>
                                        <h1 className="text-app-main w-1/2 font-bold" style={{ fontSize: '.625rem' }}>Date</h1>
                                        <h1 className="text-sm w-1/2 text-right">{receipt.createdAt ? formatDate(receipt.createdAt, false) : '-'}</h1>
                                    </div>

                                    <hr className="divide-zinc-700"/>

                                    <h1 className="text-app-main text-center uppercase font-bold font-[.625rem] py-5">Items Bought</h1>

                                    {receipt.sales && <div className="space-y-3">{
                                        receipt.sales.map(({ product, qty, price, description }, index) =>
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

                                        <div className="grid gap-4 pt-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold">Discount:</span>
                                                <div className="text-black text-[16px] text-center font-bold">
                                                    &#8358; {formatMoney(receipt.discount)}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold">Amount Paid:</span>
                                                <div className="text-green-400 text-[16px] text-center font-bold">
                                                    &#8358; {formatMoney(receipt.amount)}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold">Amount Unpaid:</span>
                                                <div className="text-red-400 text-[16px] text-center font-bold">
                                                    &#8358; {formatMoney(receipt.balance)}
                                                </div>
                                            </div>

                                            <hr className="divide-zinc-700"/>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold">Final Amount Payable:</span>
                                                <div className="text-app-main text-2xl text-center font-bold">
                                                    &#8358; {formatMoney(
                                                        receipt.sales.reduce((acc, curr) => {
                                                            return acc = acc + (parseInt(curr.price || 0) * parseInt(curr.qty || 0));
                                                        }, 0) - (parseInt(receipt?.discount || 0))
                                                        )}
                                                </div>
                                            </div>
                                            <hr className="divide-zinc-700"/>
                                        </div>


                                    </div>}
                                
                                    <div className="flex flex-wrap justify-center items-center py-8 text-xs" style={{textTransform: 'capitalize'}}>
                                        <button type="" 
                                            className="font-bold text-app-main p-3 shadow-md w-1/3 flex justify-center items-center rounded-md mx-auto"
                                            onClick={() => window.print()}
                                        >
                                            <IoPrint className="mr-3 text-sm text-app-main" />
                                            Print
                                        </button>
                                        {receipt.customer_phone && <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send/?phone=${receipt.customer_phone.replace(/^0/, '234')}&text=Hi, Here is your receipt from Victory Granite&app_absent=0`} type="" className="font-bold text-white bg-app-main p-3 shadow-md w-1/3 flex justify-center items-center rounded-md mx-auto">
                                            <IoIosSend className="mr-3 text-sm text-white" />
                                            Share
                                        </a>}
                                    </div>

                                </div>

                            </div>
                            :
                            <div className="grid place-content-center py-16">
                                <AiOutlineFileSearch className="text-black text-3xl text-center w-full" />
                                <p className="text-black text-center text-xs font-bold pt-3">
                                    No Transaction <br/> Found
                                </p>
                            </div>
                        }

                    </div>

                </div>
            </div>
        </>
    );

}

export default Receipt;