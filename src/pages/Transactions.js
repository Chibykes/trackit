import {useState, useEffect, useRef, useContext} from 'react';
import Sidebar from '../component/Sidebar';
import Splash from '../component/Splash';
import Trx from '../component/Trx';
import { HiMenuAlt1 } from 'react-icons/hi';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { AppContext } from '../context/AppContext';


const Transactions = () => {

    const { url, loadSplash, setLoadSplash, Toast } = useContext(AppContext);
    const [showSidebar, setShowSidebar] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [limit, setLimit] = useState('10');
    const [input, setInput] = useState('');
    const [order, setOrder] = useState('desc');

    const searchInputRef = useRef(null);
    const limitRef = useRef(null);
    
    const searchTrx = (e) => {
        e && e.preventDefault();

        const query = input ? {
            $or: [
                {id: {$regex: input.replace(/\\/ig, '')}},
                {customer_name: {$regex: input.replace(/\\/ig, '')}},
                {category: {$regex: input.replace(/\\/ig, '')}},
            ]
        } : { };

        fetch(`${url}/trx?limit=${limit || 10}&query=${JSON.stringify(query)}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(({data}) => {
            setLoadSplash(false);
            if(order === 'asc'){
                return setTransactions(data.reverse());
            }
            setTransactions(data);
        })
        .catch(err => {
            setLoadSplash(false);
            Toast('error', 'An error occurred. Check Internet connection');
        })
    }

    // eslint-disable-next-line
    useEffect(searchTrx, [limit, input])

    return (
        <> 
            {loadSplash && <Splash/>}
            <div className="lg:flex lg:w-1/2 w-full mx-auto">

                <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} /> 
                    
                {/* Main */}
                <div className="p-5 lg:w-4/6 w-full space-y-8 lg:px-10 px-5 mx-auto border-r border-l border-gray-50"> {/* Header */}
                    <div className="flex justify-between items-center">
                        <HiMenuAlt1 onClick={
                                () => setShowSidebar(!showSidebar)
                            }
                            className=""
                            title=""/>

                        <h1 className="font-bold">
                            Transactions
                        </h1>

                    </div>


                    {/* Transacion Table */}
                    <div className="">
                        <form className="w-full" onSubmit={ searchTrx }>

                            <div className="">
                                <input 
                                    type="text"
                                    placeholder="Search Customer Name / Trx ID / Category"
                                    className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                    ref={searchInputRef}
                                    value={input}
                                    onChange={() => setInput(searchInputRef.current.value)}
                                />
                            </div>

                        </form>

                        <div className="flex justify-around items-center pt-2">
                            <div className="flex justify-center items-center" onClick={ () => {
                                order === 'asc' ? setOrder('desc') : setOrder('asc');
                                setTransactions(transactions.reverse());
                            }}>
                                <p className="font-bold text-xs text-black">
                                    Order: 
                                </p>
                                {order === 'desc' && <div className="grid grid-cols-1 px-2">
                                    <IoMdArrowDropup className="text-gray-200 transform translate-y-1" />
                                    <IoMdArrowDropdown className="text-app-main transform -translate-y-1" />
                                </div>}
                                {order === 'asc' && <div className="grid grid-cols-1 px-2">
                                    <IoMdArrowDropup className="text-app-main transform translate-y-1" />
                                    <IoMdArrowDropdown className="text-gray-200 transform -translate-y-1" />
                                </div>}
                            </div>
                            <div className="flex justify-center items-center">
                                <p className="font-bold text-xs text-black">
                                    Limit: 
                                    <input 
                                        className="text-app-main px-2 font-bold focus:outline-none w-9"
                                        ref={limitRef}
                                        onChange={ () => setLimit(limitRef.current.value) }
                                        value={(limit > 50) ? setLimit(50) : limit }
                                    />
                                </p>
                            </div>
                        </div>

                        

                        {/* <h1 className="font-bold">Transactions</h1> */}
                        <div className="pt-3 relative"> {
                            transactions.length > 0 ? 
                            transactions.map(trx => <Trx {...trx} key={trx.id}/>) :
                            <div className="grid place-content-center py-16">
                                <AiOutlineFileSearch className="text-black text-3xl text-center w-full" />
                                <p className="text-black text-center text-xs font-bold pt-3">
                                    No Transaction <br/> Found
                                </p>
                            </div>
                        } </div>

                        <div className="flex justify-around items-center">
                            <div className="w-1/5 border-t"></div>
                            <p className="text-center text-gray-400 text-xs font-bold py-3">
                                End
                            </p>
                            <div className="w-1/5 border-t"></div>
                        </div>


                    </div>

                </div>

            </div>
        </>
    );


};

export default Transactions;
