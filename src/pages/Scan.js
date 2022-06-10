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
                    facingMode={isMobile ? 'environment' : 'user'}
                    className="fixed w-full h-full flex justify-center items-center"
                    style={{ transform: 'rotateY(180deg)' }}
                />
            </div>
        </>
    );

}

export default Scan;