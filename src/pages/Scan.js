import QrReader from 'react-qr-scanner';
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
                    resolution={720}
                />
            </div>
        </>
    );

}

export default Scan;