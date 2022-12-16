import trackit from '../static/trackit.png';

const Splash = () => {
    return (
        <div className=" fixed bg-white w-full h-full grid place-content-center z-50">
            <div className="mx-auto animate-pulse">
                <img className="lg:mb-5 mb-2 mx-auto w-12 h-12" src={trackit} alt="Vegis Banner"/>
                <div className="uppercase text-sm font-bold pb-3">Trackit</div>
                <div className="rounded-full overflow-hidden bg-app-light relative w-full mx-auto" style={{height: '0.2rem'}}>
                    <div className="w-1/3 rounded-full bg-app-main absolute animate-move -left-10" style={{height: '0.2rem'}}></div>
                </div>
            </div>
        </div>
    );
}

export default Splash;