import QrReader from 'react-qr-scanner';
import { isMobile } from 'react-device-detect';

import { useNavigate } from 'react-router-dom';

const Scan = () => {
    const navigate = useNavigate();

    return(
        <>
            <div>
                <QrReader
                    delay={300}
                    onError={(err) => console.log(err)}
                    onScan={(data) => data && navigate('/trx/'+data)}
                    className="fixed w-full h-full flex justify-center items-center"
                    style={{ transform: 'rotateY(180deg)' }}
                    constraints={{ facingMode: isMobile ? 'environment' : 'user', audio: false, video: true }}
                />
            </div>
        </>
    );

}

export default Scan;