import React from 'react'
import { useNavigate } from 'react-router-dom';
import Auctioneer from './Images/Auctioneer.png';
import Trader from './Images/Trader.png'
const Selection = () => {
    const navi = useNavigate()
    function handleNavi(name) {
        if (name === "Auctioneer") {
            navi("/AuctioneerLogin")
        }
        else {
            navi("/traderPage")
        }
    }
    return (
        <div className='container-fluid p-4 mt-5'>
            <div className='row align-items-start'>
                <div className="col text-center" >
                    <div className='container-fluid img-container' onClick={() => handleNavi("Auctioneer")}>
                        <img src={Auctioneer} alt="Auctioneer" style={{
                            width: "100%",
                            maxWidth: "250px",
                            height: "auto",
                            objectFit: "contain",
                        }} className=' rounded-pill shadow-lg'></img>
                    </div>
                    <h3>Auctioneer</h3>
                </div>
                <div className="col text-center">
                    <div className='container-fluid img-container ' onClick={() => handleNavi("Trader")}>
                        <img src={Trader} alt="Trader" style={{
                            width: "100%",
                            maxWidth: "250px",
                            height: "auto",
                            objectFit: "contain",
                        }} className='rounded-pill shadow-lg'></img>
                    </div>
                    <h3>Trader</h3>
                </div>
            </div>
        </div>
    )
}

export default Selection