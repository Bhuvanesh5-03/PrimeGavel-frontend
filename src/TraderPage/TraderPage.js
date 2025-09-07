import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifyToken } from './VerifyToken.js';

const TraderPage = () => {
  const navi = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await VerifyToken();
      if (!isValid) {
        navi('/TraderLogin');
      }
    };

    checkToken();
  }, [navi]);

  function handleNavi() {
    navi("/AuctionPage");
  }
  function handleWinPage(){
    navi("/MyWinnings")
  }
function handleTodayAuction() {
    navi("/TodayAuction"); 
  }
  return (
    <div 
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      
     
      <div className="rounded-5 container border w-50 shadow mt-5 mb-5 text-center traderPage bg-dark bg-opacity-50 p-4">
        <h3 className="text-white text-shadow">Welcome To Auction</h3>
        <div className="d-grid gap-3 m-5">
          <button className="btn btn-light btn-lg fw-semibold shadow-sm" onClick={handleWinPage}>
            🏆 My Winnings
          </button>
          <button
            className="btn btn-warning btn-lg fw-semibold shadow-sm"
            onClick={handleNavi}
          >
            🔨 Enter Auction
          </button>
          <button
            className="btn btn-info btn-lg fw-semibold shadow-sm"
            onClick={handleTodayAuction}
          >
            📅 View Today’s Auction
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraderPage;
