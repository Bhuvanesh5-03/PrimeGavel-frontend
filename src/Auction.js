import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { VerifyToken } from "./VerifyToken.js";

export default function Auction() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentBid, setCurrentBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState(null);
  const [increment, setIncrement] = useState(2);
  const [ended, setEnded] = useState(false);
  const [incrInput, setIncrInput] = useState(2);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auctionItems, setAuctionItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [auctionId, setAuctionId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);

  const navi = useNavigate();
  const myName = localStorage.getItem("emailid") || "You";

  useEffect(() => {
    const checkToken = async () => {
      const ok = await VerifyToken();
      if (!ok) {
        navi("/TraderLogin");
      } else {
        setVerified(true);
      }
      setLoading(false);
    };
    checkToken();
  }, [navi]);

  const socket = useMemo(() => {
    if (!verified) return null;
    return io("http://localhost:5000", {
      transports: ["websocket"],
      auth: { token: localStorage.getItem("Usertoken") || "" },
    });
  }, [verified]);

  const incrRef = useRef(incrInput);
  useEffect(() => {
    incrRef.current = incrInput;
  }, [incrInput]);

  // ✅ Define placeBid using useCallback to memoize the function
  const placeBid = useCallback(() => {
    if (!socket || ended || !auctionId) return;
    socket.emit("auction:bid", {
      auctionId,
      bidder: myName,
      increment: incrRef.current,
    });
  }, [socket, ended, auctionId, myName]); // Add dependencies here

  // Fetch and sort auctions, filtering out items with winners
  useEffect(() => {
    if (!verified) return;
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost:5000/AuctionPage", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`,
          },
        });
        const data = await response.json();
        if (data.success && data.info.length > 0) {
          const filteredItems = data.info.filter(item => !item.winner);
          const sortedItems = filteredItems.sort((a, b) => {
            const numA = parseInt(a.lotNumber.replace("lot-", ""));
            const numB = parseInt(b.lotNumber.replace("lot-", ""));
            return numA - numB;
          });
          if (sortedItems.length === 0) {
            setError("No available auctions (all items already have winners).");
            return;
          }
          setAuctionItems(sortedItems);
          const initialItem = sortedItems[0];
          setAuctionId(initialItem.lotNumber);
          setProductDetails(initialItem);
          if (socket) {
            socket.emit("auction:join", { auctionId: initialItem.lotNumber, name: myName });
          }
        } else {
          setError(data.message || "No auctions available.");
        }
      } catch (err) {
        setError("Error fetching auctions.");
        console.error(err);
      }
    };
    fetchAuctions();
  }, [verified, socket, myName]);

  useEffect(() => {
    if (!socket || !auctionId) return;

    const onState = (payload) => {
      setTimeLeft(payload.timeLeft);
      setCurrentBid(payload.currentBid);
      setHighestBidder(payload.highestBidder);
      setIncrement(payload.increment || 2);
      setEnded(payload.ended);
    };

    const onUpdate = (payload) => {
      onState(payload);
    };

    const onEnd = (payload) => {
      onState(payload);
      setTimeout(() => {
        if (currentIndex < auctionItems.length - 1) {
          const nextIndex = currentIndex + 1;
          const nextItem = auctionItems[nextIndex];
          setCurrentIndex(nextIndex);
          setAuctionId(nextItem.lotNumber);
          setProductDetails(nextItem);
          socket.emit("auction:join", { auctionId: nextItem.lotNumber, name: myName });
        } else {
          setError("All auctions completed.");
        }
      }, 3000);
    };

    socket.on("auction:state", onState);
    socket.on("auction:update", onUpdate);
    socket.on("auction:end", onEnd);
    socket.on("auction:error", (err) => {
      setError(err.message || "Auction error");
      console.error("Auction error:", err);
    });

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        placeBid();
      } else if (!isNaN(e.key) && e.key !== "0" && e.key >= "1" && e.key <= "9") {
        setIncrInput(Number(e.key));
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      socket.off("auction:state");
      socket.off("auction:update");
      socket.off("auction:end");
      socket.off("auction:error");
    };
  }, [socket, auctionId, currentIndex, auctionItems, myName, placeBid]); // ✅ Add placeBid to the dependency array

  if (loading) {
    return <div className="text-center mt-5"><h4>Verifying token...</h4></div>;
  }

  if (error) {
    return <div className="container-fluid min-vh-100 bg-light text-center pt-5"><div className="alert alert-danger">{error}</div></div>;
  }

  if (!auctionId || !productDetails) {
    return <div className="container-fluid min-vh-100 bg-light text-center pt-5"><h4>No auctions available. Please check back later.</h4></div>;
  }

  const lotNumber = auctionId.replace("lot-", "");
  const remainingLots = auctionItems.length - currentIndex - 1;

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row bg-dark text-white py-3">
        <div className="col text-start fs-5 fw-semibold">
          Current Lot No.: <span className="fw-bold">{lotNumber}</span>
        </div>
        <div className="col text-end fs-5 fw-semibold">
          Remaining Lots: <span className="fw-bold">{remainingLots}</span>
        </div>
      </div>

      <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-6">
          <h2 className="fw-bold">Product Name: {productDetails.productName}</h2>
          <p className="fs-5 mt-2">Product Quantity: {productDetails.quantity} kg</p>
          <p className="fs-5 mt-2">Current Price: Rs. {currentBid} / per kg</p>
          <p className="fs-5 mt-2">Default Increment (server): Rs. {increment}</p>

          <p className="fs-6 mt-2">
            Your Increment (choose 1–9):
            <div className="d-flex gap-2 flex-wrap mt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  className={`btn ${incrInput === num ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setIncrInput(num)}
                  disabled={ended}
                >
                  {num}
                </button>
              ))}
            </div>
          </p>

          <img
            src={productDetails.image || "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg"}
            alt={productDetails.productName}
            className="img-fluid rounded shadow mt-4"
            style={{ maxWidth: "300px" }}
          />
        </div>

        <div className="col-md-4 text-center">
          <h3 className="fw-bold mb-3">Time left</h3>
          <div
            className="rounded-circle d-flex flex-column align-items-center justify-content-center text-white fw-bold shadow"
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: ended ? "#6c757d" : "#6f42c1",
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: "3rem" }}>{timeLeft}</div>
            <div
              className="rounded-circle mt-2"
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: ended ? "gray" : "green",
              }}
            ></div>
          </div>

          <div className="mt-3">
            <span className="badge bg-secondary">
              Highest Bidder: {highestBidder || "—"}
            </span>
          </div>

          <div className="d-grid gap-2 mt-4">
            {!ended && (
              <>
                <div className="alert alert-info fw-semibold">
                  Press <kbd>Enter</kbd> to place a bid of +{incrInput}
                </div>
                <button
                  className="btn btn-success btn-lg fw-semibold"
                  onClick={placeBid}
                >
                  Place Bid (+{incrInput})
                </button>
              </>
            )}
            {ended && (
              <div className="alert alert-success mt-2 fw-semibold">
                Auction ended. Final bid: Rs. {currentBid}. Moving to next lot...
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center gap-4 mt-4">
            <div className="d-flex align-items-center">
              <span
                className="rounded-circle me-1"
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: ended ? "gray" : "green",
                }}
              ></span>
              <span>{ended ? "Ended" : "Live"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
