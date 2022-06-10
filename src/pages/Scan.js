import {useState, useEffect} from 'react';
import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const Scan = () => {

    const [camera, setCamera] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                let videoSelect = [];
    
                devices.forEach((device) => {
                    if (device.kind === 'videoinput') {
                        videoSelect.push(device)
                    }
                })
    
                return videoSelect;
            })
            .then((devices) => {
                setCamera({
                    cameraId: devices[devices.length - 1].deviceId,
                    devices,
                    loading: false,
                })
            })
            .catch(err => console.error(err));

        return;
        //eslint-disable-next-line
    }, [])


        return(
            <>
                <div>
                    <div className="flex justify-center items-center py-4">
                        <label className="mx-2 font-bold text-xs text-app-main">Select Camera: </label>
                        <select
                            className="block lg:w-1/3 w-1/2 mx-2 p-2 text-xs border border-zinc-800 bg-app-main text-white font-bold"
                            onChange={(e) => setCamera({...camera, cameraId: e.target.value })}
                            >
                            <option value="">Choose Cameras</option>
                            {camera.devices && camera.devices.map(({deviceId, label}, index) => 
                                <option value={deviceId} key={deviceId}>
                                    {label || `camera ${index}`}
                                </option>
                            )}
                        </select>
                    </div>

                    
                    <QrReader
                        delay={300}
                        onError={(err) => console.log(err)}
                        onScan={(data) => data && navigate('/trx/'+data)}
                        className="fixed top-0 left-0 right-0 w-full h-full flex justify-center items-center"
                        style={{ transform: 'rotateY(180deg)' }}
                        constraints={camera.cameraId && ({ audio: false, video: { deviceId: camera.cameraId } })}
                    />
                </div>
            </>
        );

}

export default Scan;