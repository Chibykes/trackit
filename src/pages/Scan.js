import {useState} from 'react';
import QrReader from 'react-qr-scanner';
import { isMobile } from 'react-device-detect';

import { useNavigate } from 'react-router-dom';

const Scan = () => {

    const [camera, setCamera] = useState({});
    const navigate = useNavigate();

    navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
            const videoSelect = [];

            devices.forEach((device) => {
                if (device.kind === 'videoinput') {
                    videoSelect.push(device)
                }
            })

            return videoSelect
        })
        .then((devices) => {
            setCamera({
                cameraId: devices[devices.length - 1].deviceId,
                devices,
                loading: false,
            })

        })
        .catch(err => console.error(err));

        return(
            <>
                <div>
                    <select
                        className="w-full my-3 mx-2 p-2 text-xs"
                        onChange={e => setCamera({...camera, cameraId: value })}
                        >
                        {camera.devices.map(({deviceId, label}, index) => (
                            <React.Fragment key={deviceId}>
                                <option value={deviceId}>
                                    {label || `camera ${index}`}
                                </option>
                            </React.Fragment>
                        ))}
                    </select>

                    <QrReader
                        delay={300}
                        onError={(err) => console.log(err)}
                        onScan={(data) => data && navigate('/trx/'+data)}
                        className="fixed w-full h-full flex justify-center items-center"
                        style={{ transform: 'rotateY(180deg)' }}
                        constraints={
                            camera?.cameraId && ({ 
                                audio: false, 
                                video: { deviceId: camera.cameraId }
                            })
                        }
                    />
                </div>
            </>
        );

}

export default Scan;