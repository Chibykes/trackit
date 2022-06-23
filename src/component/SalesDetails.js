import {useState, useContext} from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {HiPlusCircle} from 'react-icons/hi';
import {IoMdClose} from 'react-icons/io';
import { motion } from 'framer-motion';

import {AppContext} from '../context/AppContext';
import formatMoney from '../utils/formatMoney';

const SalesDetails = ({ sales, setSales, modalClose, setModalClose, spendings }) => {


    const { Toast } = useContext(AppContext);

    const [ item, setItem ] = useState({
        product: '',
        qty: '',
        price: '',
        description: ''
    });

    const [pan, setPan] = useState({ start: {}, end: {} });
    const popup = {
        initial: { bottom: '-100%' },
        animate: { bottom: modalClose ? '-100%' : '0%' },
        transition: { duration: 0.5, type: 'tween', stiffness: 100 }
    }

    const handleItemChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    const handleItemAdd = (e) => {
        e.preventDefault();

        for( let property in item) {
            if(item['description'] === '') continue;
            if(item[property] === '') {
                Toast('error', `Please fill all the fields`);
                return;
            }
        }

        setSales([...sales, item]);
        setItem({
            product: '',
            qty: '',
            price: '',
            description: '',
        });
        Toast('success','Item added');
    }

    return (
        <>
        
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-xs font-bold block pb-2">
                    Items Bought
                </span>

                <div className="font-bold text-xs text-white space-x-1 p-1 px-3 bg-app-main flex justify-between items-center rounded-md active:ring-purple-400 ring-transparent ring-2 ring-offset-2 cursor-pointer" onClick={() => setModalClose(false)}>
                    <HiPlusCircle className="text-white cursor-pointer"/>
                    <span>Add</span>
                </div>

            </div>

            {sales.length > 0 ? 
            
                <div className="space-y-3">{
                    sales.map(({ product, qty, price, description }, index) =>
                        <div className="border border-app-light rounded-lg p-3" key={index+1}>
                            <div className="grid grid-cols-12">
                                <div className="col-span-11 space-y-1">
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
                                    {/* <div className="text-xs font-bold space-x-5">
                                        <span className="text-xs text-gray-500 font-normal">Total Price: </span> 
                                        <span>&#8358; 52,000</span>
                                    </div> */}
                                    <div className="text-xs font-bold space-x-5">
                                        <div className="text-app-main text-xl text-center">&#8358; {formatMoney(parseInt(price || 0) * parseInt(qty || 0))}</div>
                                        <div className="text-xs text-center font-normal">Total Price: </div> 
                                    </div>
                                </div>
        
                                <div className="cols-span-1 grid place-content-center cursor-pointer" onClick={
                                        () => setSales(sales.filter(a => sales.indexOf(a) !== index))
                                    }>
                                    <div className={`bg-red-50 group hover:bg-red-400 rounded-full w-8 h-8 grid place-content-center`}>
                                        <RiDeleteBin6Line className="text-red-400 group-hover:text-white"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center py-5">
                        <span className="text-xs font-bold">Total Value of Items:</span>
                        <div className="text-app-main text-xl text-center font-bold">
                            &#8358; {formatMoney(
                                sales.reduce((acc, curr) => {
                                    return acc = acc + (parseInt(curr.price || 0) * parseInt(curr.qty || 0));
                                }, 0)
                            )}
                        </div>
                    </div>
                </div>
            :
                <div className="text-center text-gray-500 py-8">
                    <p className="text-sm text-center font-bold">No Itmes added yet</p>
                    <p className="text-[.625rem] text-center">Click "Add" to begin...</p>
                </div>
            }

        </div>


        <div className={`${modalClose ? 'hidden' : 'block'} fixed top-0 left-0 w-full h-full bg-black opacity-30 mt-[0!important] z-[2]`}></div>

        <motion.div className={`block fixed bottom-[-100%] left-0 right-0 w-full h-[80vh] bg-white lg:w-[calc(42%*4/6)] py-10 pt-5 px-8 mx-auto rounded-t-[2rem] z-[3] touch-pan-y`} {...popup}>
            <div className="space-y-5 overflow-y-auto">
                <motion.div 
                    onPanStart={(e, info) => setPan({...pan, start: {...info.point}})}
                    onPanEnd={(e, info) => {
                        return (info.point.y > pan.start.y + 50) && setModalClose(true)
                    }}
                    className="h-[6px] bg-zinc-200 rounded-full w-1/3 mx-auto">
                </motion.div>
                <div className="flex justify-between items-center mb-5">
                    <div className="text-xs text-left font-bold block">
                        Add Product
                    </div>

                    <IoMdClose className="text-app-main text-xl" onClick={() => setModalClose(true)} />
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                        <input type="text" name="product" placeholder="Product Name" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                            onChange={handleItemChange}
                            value={item.product}
                        />
                    </div>
                    <div className="col-span-5">
                        <input type="number" name="qty" min="0" placeholder="Quantity" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                            onChange={handleItemChange}
                            value={item.qty}
                        />
                    </div>
                    <div className="col-span-7">
                        <input type="number" name="price" min="0" placeholder="Price (per)" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                            onChange={handleItemChange}
                            value={item.price}
                        />
                    </div>

                    <div className="col-span-12">
                        <textarea type="text" name="description" placeholder="A short description about the item" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full resize-none h-24"
                            onChange={handleItemChange}
                            value={item.description}> 
                        </textarea>
                    </div>

                    <div className="col-span-12 py-5">
                        <div className="col-span-12 text-xs font-bold">
                            <div className="text-app-main text-3xl text-center">&#8358; {formatMoney(parseInt(item.qty || 0)*parseInt(item.price || 0))}</div>
                            <div className="text-xs text-center font-normal">Total Price </div> 
                        </div>
                    </div>

                    <div className="col-span-12">
                        <button type="text" className="p-3 bg-app-main text-white text-sm rounded-xl block w-full mx-auto font-bold active:ring-purple-400 ring-transparent ring-2 ring-offset-2 cursor-pointer" onClick={handleItemAdd}>
                            {spendings ? 'Add Expenses':'Add Sales'}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
        
        
        </>
    );
}

export default SalesDetails;