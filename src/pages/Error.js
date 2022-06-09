import {
    BiArrowBack
} from 'react-icons/bi';

const Error = (props) => {

    return (
        <>
            <div className="fixed w-full h-full top-0 left-0 grid place-content-center text-center">

                <h1 className="font-bold text-6xl">404</h1>
                <p className="text-sm pt-1 pb-5">Page Not Found!</p>
                <p className="bg-app-main text-sm text-white rounded-full p-1 font-bold cursor-pointer" onClick={() => window.history.back()}>
                    <BiArrowBack className="inline mr-3" />
                    Go back
                </p>

            </div>
        </>
    );

}

export default Error;