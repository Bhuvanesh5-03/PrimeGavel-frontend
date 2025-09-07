import React, { useEffect, useState } from "react";

const MyWinnings = () => {
  const [myWinnings, setMyWinnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyWinnings = async () => {
      try {
        const userEmail = localStorage.getItem("emailid");
        if (!userEmail) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/Winners", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`,
          },
          body: JSON.stringify({ emailid: userEmail }),
        });

        const data = await response.json();
        if (data.success) {
          setMyWinnings(Array.isArray(data.pastAuction) ? data.pastAuction : []);
        } else {
          setError(data.message || "No past winnings found");
        }
      } catch (err) {
        setError("Error fetching past winnings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyWinnings();
  }, []);

  if (loading) return <p>Loading your winnings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Past Wins</h2>

      {myWinnings.length === 0 ? (
        <p className="text-center">You have no past auction wins.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Lot No.</th>
                <th>Product Name</th>
                <th>Quantity (kg)</th>
                <th>Base Price (Rs.)</th>
                <th>Final Bid (Rs.)</th>
                <th>Consignor Name</th>
                <th>Product Type</th>
                <th>Auction Date</th>
              </tr>
            </thead>
            <tbody>
              {myWinnings.map((win, idx) => (
                <tr key={idx}>
                  <td>{win.lotNumber}</td>
                  <td>{win.productName}</td>
                  <td>{win.quantity}</td>
                  <td>{win.basePrice}</td>
                  <td>{win.finalBid}</td>
                  <td>{win.consignorName}</td>
                  <td>{win.productType}</td>
                  <td>{win.auctionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default MyWinnings;
