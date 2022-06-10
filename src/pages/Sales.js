import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {HiMenuAlt1} from 'react-icons/hi';

import { AppContext } from '../context/AppContext';
import Sidebar from '../component/Sidebar';
import Splash from '../component/Splash';
import SalesDetails from '../component/SalesDetails';


const Sales = () => {

    const navigate = useNavigate();

    const { url, loadSplash, setLoadSplash, Toast } = useContext(AppContext);
    const [showSidebar, setShowSidebar] = useState(false);
    const [modalClose, setModalClose] = useState(true);
    const [sales, setSales] = useState([]);
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_phone: '',
        amount: 0,
        balance: 0
    });
    

    const handleFormData = (e) => {
        let balance = 0;
        
        if(e.target.name === 'amount'){
            if(sales.length <= 0) return Toast('error', `Please add sales items`);

            balance = sales.reduce((acc, curr) => {
                return acc = acc + (parseInt(curr.price || 0) * parseInt(curr.qty || 0));
            }, 0) - parseInt(e.target.value);
        }

        setFormData({
            ...formData,
            balance,
            [e.target.name]: e.target.value,
        })
    }

    const detailsComplete = () => {
        for( let property in formData) {
            if(formData[property] === '') {
                return false;
            }
        }
        
        if(sales.length <= 0){
            return false;
        }

        return true;
    }

    const submitData = (e) => {
        e.preventDefault();
        setLoadSplash(true);
        if(!detailsComplete()) return Toast('error', `Please fill all the fields`);
        console.log({...formData, sales})
        
        fetch(`${url}/new-sales`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({...formData, sales})
        })
        .then(res => res.json())
        .then(({data, user}) => {
            if(!user){
                navigate(`/`)
                setLoadSplash(false);
                return Toast('error','Session expired');
            }

            navigate(`/trx/${data.id}`);
        })
        .catch(err => {
            Toast('error','An error occurred. Check Internet connection');
            setLoadSplash(false);
        })
    }


    return (<> {
        loadSplash && <Splash/>
    }
        <div className="lg:flex lg:w-1/2 w-full mx-auto">

            <Sidebar showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                /> {/* Main */}
            <div className="p-5 lg:w-4/6 w-full space-y-8 lg:px-10 px-5 mx-auto border-r border-l border-gray-50"> {/* Header */}
                <div className="flex justify-between items-center">
                    <HiMenuAlt1 onClick={
                            () => setShowSidebar(!showSidebar)
                        }
                        className=""
                        title=""/>

                    <h1 className="font-bold">
                        Sales
                    </h1>
                </div>

                <div className="">

                    <p className="text-center text-gray-400 w-full"
                        style={
                            {fontSize: '.625rem'}
                    }>
                        This page is to record payments (i.e payments made to the firm by customers). To record spendings &nbsp;
                        <Link to="/spendings" className="text-app-main font-bold">
                            Click here
                        </Link>
                    </p>

                    <form className="w-full py-5 space-y-5"
                        onSubmit={submitData}>

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Customer Name
                            </label>
                            <input type="text" name="customer_name" placeholder="Customers' Name" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleFormData}
                                value={formData.customer_name}
                                />
                        </div>

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Customer Phone
                            </label>
                            <input type="text" name="customer_phone" placeholder="Customers' Phone Number" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleFormData}
                                value={formData.customer_phone}
                                />
                        </div>


                        {/* Receipt */}
                        <SalesDetails 
                            sales={sales} 
                            setSales={setSales} 
                            modalClose={modalClose} 
                            setModalClose={setModalClose}
                        />
                        



                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Amount Customer Paid
                            </label>
                            <input type="number" name="amount" placeholder="Amount Paid by the Customer" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleFormData}
                                value={formData.amount}
                                />
                        </div>

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Amount Upaid (How much customer owes)
                            </label>
                            <input type="number" name="balance" placeholder="Amount customer is yet to pay"     className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleFormData}
                                value={formData.balance}
                            />
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

export default Sales;
