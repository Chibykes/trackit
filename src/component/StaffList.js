import { ImUsers } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {Link} from 'react-router-dom';
import formatMoney from '../utils/formatMoney';
import formatDate from '../utils/formatDate';

const StaffList = ({ id, username, name, deleteStaff }) => {

    return(
        <>
            <div className="flex justify-start items-center py-3 hover:bg-gray-50 rounded-md capitalize gap-4">
                <div className={`bg-purple-50 rounded-full w-6 h-6 grid place-content-center`}>
                    <ImUsers className="text-app-main text-xl"/>
                </div>
                <div className="px-3 space-y-1">
                    <>
                        <p className="text-left text-sm font-bold">{username}</p>    
                        <p className="text-left text-xs text-gray-400">{name}</p>
                        <p className="text-left font-bold text-xs text-app-main">ID: {id}</p>
                    </>
                </div> 
                <div className="font-bold text-xs ml-auto text-right">
                    <div className={`bg-red-50 group hover:bg-red-400 rounded-full w-8 h-8 grid place-content-center cursor-pointer`} onClick={() => deleteStaff(id)}>
                        <RiDeleteBin6Line className="text-red-400 group-hover:text-white"/>
                    </div>
                </div>
            </div>
            <div className="w-2/3 bg-gray-50 mx-auto" style={{ height: '1px' }}></div>
        </>
    );

}

export default StaffList;