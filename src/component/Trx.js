import {
    BiArrowToTop,
    BiArrowToBottom,
} from 'react-icons/bi';
import formatMoney from '../utils/formatMoney';
import formatDate from '../utils/formatDate';
import {Link} from 'react-router-dom';

const Trx = ({ id, type, customer_name, customer_phone, amount, createdAt: date }) => {

    return(
        <>
            <Link to={`/trx/${id}`} key={id} className="flex justify-start items-center py-3 hover:bg-gray-50 rounded-md" style={{ textTransform: 'capitalize' }}>
                <div className={`${type === 'debit' && 'bg-red-50'} ${type === 'sales' && 'bg-green-50'} rounded-full w-6 h-6 grid place-content-center`}>
                    {type === 'debit' && <BiArrowToTop className="text-red-400 text-xl"/>
                    }
                    {type === 'sales' && <BiArrowToBottom className="text-green-400 text-xl"/>
                    }
                </div>
                <div className="px-3 space-y-1">
                    <p className="text-left text-sm font-bold">{customer_name}</p>    
                    <p className="text-left text-xs text-gray-400">{customer_phone}</p>    
                </div> 
                <div className="font-bold text-xs ml-auto text-right">
                    {type === 'debit' && 
                        <span className="text-red-400">
                            -&#8358;{formatMoney(amount)}
                        </span>
                    }
                    {type === 'sales' && 
                        <span  className="text-green-400">
                            +&#8358;{formatMoney(amount)}
                        </span>
                    }
                    <p className="font-normal text-gray-400" style={{ fontSize: '.625rem' }}>{formatDate(date)}</p>
                </div>
            </Link>
            <div className="w-2/3 bg-gray-50 mx-auto" style={{ height: '1px' }}></div>
        </>
    );

}

export default Trx;