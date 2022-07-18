import {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {HiMenuAlt1} from 'react-icons/hi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { AppContext } from '../context/AppContext';
import Sidebar from '../component/Sidebar';
import Splash from '../component/Splash';
import formatMoney from '../utils/formatMoney';
import formatDate from '../utils/formatDate';

ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {

    const navigate = useNavigate();
    
    const { url, loadSplash, setLoadSplash, Toast } = useContext(AppContext);
    const [showSidebar, setShowSidebar] = useState(false);
    const [date, setDate] = useState(1);
    const [report, setReport] = useState({ });

    const data = {
        labels: ['Sales', 'Expenses', 'Debts'],
        datasets: [
          {
            label: 'Transactions',
            data: [
                report?.sales?.reduce((acc,cum) => acc += cum.amount, 0) || 0,
                report?.expenses?.reduce((acc,cum) => acc += cum.amount, 0) || 0,
                report?.debts?.reduce((acc,cum) => acc += cum.amount, 0) || 0,
            ],
            backgroundColor: [
                '#30b565',
                '#cdc832',
                'rgba(255, 99, 132, 1)',
            ],
          },
        ],
    };

    const getReport = (e) => {
        setLoadSplash(true);
 
        fetch(`${url}/reports?date=${date}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(({data, user}) => {
            setLoadSplash(false);
            console.log(data);

            if(!user){
                navigate(`/`)
                return Toast('error','Session expired');
            }
            
            setReport(data);
        })
        .catch(err => {
            setLoadSplash(false);
            Toast('error','An error occurred. Check Internet connection');
        })
    }

    useEffect(getReport, [date]);


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
                        Reports
                    </h1>
                </div>

                <div className="space-y-5">

                    <div className="flex items-center justify-center">
                        <select 
                            className="block text-xs rounded-md p-2 w-1/2 font-bold border border-gray-200"
                            onChange={(e) => setDate(e.target.value)}
                        >
                            <option value="1" selected>Today</option>
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                        </select>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="px-5">
                            <span className="text-sm">Total { report?.sales?.length } Sales</span>
                            <p className='text-2xl font-bold'>&#8358;{ formatMoney(report?.sales?.reduce((acc,cum) => acc += cum.amount, 0) || 0) }</p>
                        </div>

                        <div className="px-5">
                            <span className="text-sm">Total { report?.expenses?.length } Expenses</span>
                            <p className='text-2xl font-bold'>&#8358;{ formatMoney(report?.expenses?.reduce((acc,cum) => acc += cum.amount, 0) || 0) }</p>
                        </div>
                    </div>

                    <div className="w-2/3 mx-auto">
                        <Doughnut data={data} />
                    </div>

                    <div className="px-5">
                        <div className="flex flex-col gap-4">

                            <h1 className="text-sm rounded inline font-bold py-3 text-center text-app-main">
                                Transactions
                            </h1>

                            <div className="flex justify-between">
                                <span className="text-sm">Total Sales</span>
                                <span className="text-sm font-bold">&#8358;{formatMoney(report?.sales?.reduce((acc,cum) => acc += cum.amount, 0)) || 0}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-sm">Total Expenses</span>
                                <span className="text-sm font-bold">&#8358;{formatMoney(report?.expenses?.reduce((acc,cum) => acc += cum.amount, 0)) || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Total Debt</span>
                                <span className="text-sm font-bold">&#8358;{formatMoney(report?.debts?.reduce((acc,cum) => acc += cum.balance, 0)) || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-bold">Net Proft</span>
                                <span className="text-sm font-bold text-app-main">&#8358;{formatMoney(
                                    (report?.sales?.reduce((acc,cum) => acc += cum.amount, 0) || 0) - 
                                    (report?.expenses?.reduce((acc,cum) => acc += cum.amount, 0) || 0) - 
                                    (report?.debts?.reduce((acc,cum) => acc += cum.balance, 0) || 0)
                                )}</span>
                            </div>

                        </div>
                    </div>

                    <div className="px-5">
                        <div className="flex flex-col gap-4">

                            <h1 className="text-sm rounded inline font-bold py-3 text-center text-app-main">
                                Top Sales
                            </h1>

                            {report?.sales?.slice(0,5)?.map(({_id, customer_name, amount}) => 
                                <div className="flex justify-between" key={_id}>
                                    <span className="text-sm capitalize">{customer_name}</span>
                                    <span className="text-sm font-bold">&#8358;{formatMoney(amount || 0)}</span>
                                </div>
                            )}
                            
                        </div>
                    </div>

                    <div className="px-5">

                        <div className="flex flex-col gap-4">
                            <h1 className="text-sm rounded inline font-bold py-3 text-center text-app-main">
                                Top Debtors
                            </h1>
                            {report?.debts?.slice(0,5)?.map(({_id, customer_name, balance}) => 
                                <div className="flex justify-between" key={_id}>
                                    <span className="text-sm capitalize">{customer_name}</span>
                                    <span className="text-sm font-bold">&#8358;{formatMoney(balance || 0)}</span>
                                </div>
                            )}
                            
                        </div>
                    </div>

                    <div className="">
                        <p className="w-3/5 mx-auto p-4 text-center text-gray-400 flex justify-center items-center gap-2">
                            <span className="w-12 h-[1px] bg-slate-300"></span>
                            <span className="font-bold text-sm">End of Report</span>
                            <span className="w-12 h-[1px] bg-slate-300"></span>
                        </p>
                    </div>

                </div>


            </div>

        </div>
    </>);


};

export default Reports;
