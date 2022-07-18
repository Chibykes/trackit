import {useState, useContext, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {HiMenuAlt1} from 'react-icons/hi';

import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation filepond-plugin-file-encode --save --legacy-peer-deps
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { AppContext } from '../context/AppContext';
import Sidebar from '../component/Sidebar';
import Splash from '../component/Splash';
import { BiPencil } from 'react-icons/bi';

// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
);


const Profile = () => {

    const navigate = useNavigate();
    
    const { url, loadSplash, setLoadSplash, Toast, user, setUser } = useContext(AppContext);
    const [showSidebar, setShowSidebar] = useState(false);
    const [changeImg, setChangeImg] = useState(false);

    const imgRef = useRef(null);
    const [profile, setProfile] = useState({
        ...user,
        password: ""
    });
    
    const handleProfile = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        })
    }

    const detailsComplete = () => {
        for( let property in profile) {
            if(!profile['img'] || !profile['password']) continue;

            if(profile[property] === '') {
                return false;
            }
        }

        return true;
    }

    const submitData = (e) => {
        e.preventDefault();
        if(!detailsComplete()) return Toast('error', `Please fill all the fields`);
        // return console.log(profile)

        setLoadSplash(true);

        
        fetch(`${url}/profile`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(profile)
        })
        .then(res => res.json())
        .then(({status, msg, user}) => {
            setLoadSplash(false);

            if(!user){
                navigate(`/`)
                return Toast('error','Session expired');
            }
            
            setUser(user);
            setProfile({...user, password: ""});
            localStorage.setItem('user', JSON.stringify(user));
            imgRef.current.removeFile();

            setChangeImg(false);
            return Toast(status, msg);
        })
        .catch(err => {
            setLoadSplash(false);
            console.log(err);
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
            <div className="p-5 lg:w-4/6 w-full space-y-8 lg:px-10 px-5 mx-auto border-r border-l border-gray-50 print:border-transparent">
                <div className="flex justify-between items-center">
                    <HiMenuAlt1 onClick={
                            () => setShowSidebar(!showSidebar)
                        }
                        className=""
                        title=""/>

                    <h1 className="font-bold">
                        Profile
                    </h1>
                </div>

                <div className="">

                    <form className="w-full py-5 space-y-5"
                        onSubmit={submitData}> 

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Image
                            </label>
                            <div className={`${!changeImg && 'hidden'}`}>
                                <FilePond
                                    className="text-xs"
                                    allowMultiple={false}
                                    allowFileSizeValidation
                                    allowImageCrop
                                    acceptedFileTypes={['image/*']}
                                    imageResizeTargetWidth={150}
                                    imageCropAspectRatio="1:1"
                                    maxFileSize="1MB"
                                    labelMaxFileSize="Image cannot be larger than 1MB"
                                    name="img"
                                    ref={imgRef}
                                    onupdatefiles={(file) => setProfile({...profile, img: file[0].getFileEncodeDataURL() || profile.img})}
                                />
                            </div>
                            {!changeImg && <div className="cursor-pointer block relative"> 
                                <img src={profile.img} alt="" className="rounded-lg mx-auto w-32 h-32 object-cover"/>
                                <div 
                                    className="bg-white w-5 h-5 p-2 grid place-content-center text-sm text-app-main rounded-full mx-auto absolute top-0 left-[60%]"
                                    onClick={() => setChangeImg(true)}
                                >
                                    <BiPencil />
                                </div>
                            </div>}
                            {/* <img 
                                src={profile.img}
                                className="block w-auto h-24 rounded-lg object-cover"
                            /> */}
                        </div>

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Fullname
                            </label>
                            <input type="text" name="name" placeholder="Staffs Name" className="capitalize p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleProfile}
                                value={profile.name}
                            />
                        </div>

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Username
                            </label>
                            <input type="text" name="username" placeholder="Staffs Username" className="capitalize p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleProfile}
                                value={profile.username}
                            />
                        </div>

                        <div className="">
                            <label className="text-xs font-bold block pb-2">
                                Password
                            </label>
                            <p className="text-[.5rem] font-bold text-yellow-500">Leave empty if you don't want to change</p>
                            <input type="text" name="password" placeholder="Password" className="p-3 bg-gray-50 text-gray-600 text-sm rounded-lg block w-full"
                                onChange={handleProfile}
                                value={profile.password}
                                minLength={8}
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

export default Profile;
