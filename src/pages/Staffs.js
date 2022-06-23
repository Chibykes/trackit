import {useState, useContext, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {HiMenuAlt1} from 'react-icons/hi';

// import {FilePond, registerPlugin} from 'react-filepond';
// import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { AppContext } from '../context/AppContext';
import Sidebar from '../component/Sidebar';
import Splash from '../component/Splash';

// Register the plugins
// registerPlugin(
//     FilePondPluginImageExifOrientation,
//     FilePondPluginImagePreview,
//     FilePondPluginFileEncode
// );



const Sales = () => {

    
    const navigate = useNavigate();
    
    const { url, loadSplash, setLoadSplash, Toast } = useContext(AppContext);
    const [showSidebar, setShowSidebar] = useState(false);

    const [newStaff, setNewStaff] = useState({
        img: '',
        name: '',
        username: '',
        password: '',
        role: 'staff'
    });
    
    const handleNewStaff = (e) => {
        setNewStaff({
            ...newStaff,
            [e.target.name]: e.target.value,
        })
    }

    const detailsComplete = () => {
        for( let property in newStaff) {
            if(newStaff['img'] === '') continue;

            if(newStaff[property] === '') {
                return false;
            }
        }

        return true;
    }

    const submitData = (e) => {
        e.preventDefault();
        if(!detailsComplete()) return Toast('error', `Please fill all the fields`);
        // return console.log(newStaff)

        setLoadSplash(true);
        
        fetch(`${url}/new-staff`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newStaff)
        })
        .then(res => res.json())
        .then(({status, msg, user}) => {
            setLoadSplash(false);

            if(!user){
                navigate(`/`)
                return Toast('error','Session expired');
            }
            
            return Toast(status, msg);
        })
        .catch(err => {
            setLoadSplash(false);
            Toast('error','An error occurred. Check Internet connection');
        })
    }


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
                        New Staffs
                    </h1>
                </div>

                <div className="">

                    <form className="w-full py-5 space-y-5"
                        onSubmit={submitData}> 

                        {/* <div className="">
                            <FilePond
                                allowMultiple={false}
                                onupdatefiles={(file) => setNewStaff({...newStaff, image: file[0].getFileEncodeDataURL()})}
                            />
                        </div> */}

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Staffs Fullname
                            </label>
                            <input type="text" name="name" placeholder="Staffs Name" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleNewStaff}
                                value={newStaff.name}
                            />
                        </div>

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Staffs Username
                            </label>
                            <input type="text" name="username" placeholder="Staffs Username" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleNewStaff}
                                value={newStaff.username}
                            />
                        </div>

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Password
                            </label>
                            <input type="text" name="password" placeholder="Password" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleNewStaff}
                                value={newStaff.password}
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
