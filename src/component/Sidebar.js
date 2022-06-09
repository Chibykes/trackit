import {Link} from 'react-router-dom';
import { MdQrCodeScanner } from 'react-icons/md';
import { GiReceiveMoney,GiPayMoney } from 'react-icons/gi';
import { BsReceipt } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';
import { FiLogOut, } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { AiFillPieChart } from 'react-icons/ai';
import { RiDashboardLine } from 'react-icons/ri';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Sidebar = ({ showSidebar, setShowSidebar }) => {

    const { user } = useContext(AppContext);

    return (
        <>
            <div className={`
                py-5 bg-white lg:sticky top-0 h-screen overflow-hidden
                fixed lg:shadow-none shadow-xl z-10
                ${showSidebar ? 'lg:w-2/6 w-full left-0' : 'lg:w-0 lg:opacity-0 -left-full'}
            `} style={{ transition: 'width .5s, left .5s' }}>
                <div className="pb-5 h-1/4 lg:h-1/5 relative grid place-content-center">
                    <div className="inline-block relative"> 
                        <img src={user && user.img} alt="" className="rounded-full mx-auto w-20 h-20 border-4 border-white shadow-lg"/>
                        <div className="bg-white w-5 h-5 p-2 grid place-content-center text-sm text-app-main rounded-full mx-auto absolute top-0" style={{ left: '60%' }}>
                            <BiPencil />
                        </div>
                    </div>
                    <p className="font-bold text-center pt-2" style={{textTransform: 'capitalize'}}>{user && user.username}</p>
                    <p className="font-bold text-center text-xs text-app-main"><span className="text-black">ID: &nbsp;</span>{user && user.id}</p>
                    <FaTimes className="absolute top-1 right-5 lg:hidden" onClick={()=>setShowSidebar(!showSidebar)} />
                </div>

                <div className="px-5 pt-3 relative flex flex-wrap h-3/4 lg:h-4/5 border-t border-gray-100">

                    <div className="w-full space-y-1">

                        <Link to="/dashboard" className="flex justify-start items-center p-3 px-4 hover:bg-black text-black hover:text-white text-sm text-left rounded-lg">
                            <RiDashboardLine className="text-xl"/>
                            <span className="pl-3 font-bold text-xs"> Dashboard </span>
                        </Link>

                        <Link to="/scan" className="flex justify-start items-center p-3 px-4 hover:bg-black text-black hover:text-white text-sm text-left rounded-lg">
                            <MdQrCodeScanner className="text-xl"/>
                            <span className="pl-3 font-bold text-xs"> Scan Receipt </span>
                        </Link>

                        <Link to="/payments" className="flex justify-start items-center p-3 px-4 hover:bg-black text-black hover:text-white text-sm text-left rounded-lg">
                            <GiReceiveMoney className="text-xl"/>
                            <span className="pl-3 font-bold text-xs"> New Payments </span>
                        </Link>
                        
                        <Link to="/spendings" className="flex justify-start items-center p-3 px-4 hover:bg-black text-black hover:text-white text-sm text-left rounded-lg">
                            <GiPayMoney className="text-xl"/>
                            <span className="pl-3 font-bold text-xs"> New Spendings </span>
                        </Link>
                        
                        <Link to="/transactions" className="flex justify-start items-center p-3 px-4 hover:bg-black text-black hover:text-white text-sm text-left rounded-lg">
                            <BsReceipt className="text-xl"/>
                            <span className="pl-3 font-bold text-xs"> Transactions </span>
                        </Link>
                        
                        <Link to="/reports" className="flex justify-start items-center p-3 px-4 hover:bg-black text-black hover:text-white text-sm text-left rounded-lg">
                            <AiFillPieChart className="text-xl"/>
                            <span className="pl-3 font-bold text-xs"> Reports </span>
                        </Link>
                        
                        {/* <Link to="/search" className="flex justify-start items-center p-3 px-4 hover:bg-black text-black hover:text-white text-sm text-left rounded-lg">
                            <AiOutlineFileSearch className="text-xl"/>
                            <span className="pl-3 font-bold text-xs"> Search Trx. </span>
                        </Link> */}
                    </div>

                    <div className="w-full flex items-end mt-auto">
                        <Link to="/logout" className="flex justify-start items-center p-3 px-4 hover:bg-app-main text-app-main hover:text-white text-sm text-left rounded-lg mt-auto w-full">
                            <FiLogOut className="text-xl"/>
                            <span className="pl-3 font-bold text-xs"> Logout </span>
                        </Link>
                    </div>
                    

                </div>
            </div>
        </>

    );

}

export default Sidebar;