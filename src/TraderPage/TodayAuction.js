import React, { useEffect, useState } from 'react';

const TodayAuction = () => {
  const [auctionData, setAuctionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayAuction = async () => {
      try {
        const response = await fetch("https://primegavel-backend.onrender.com/TodayAuction", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setAuctionData(data.data || []);
        } else {
          setError("No auction data available for today.");
        }
      } catch (err) {
        setError("Error fetching today's auction data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodayAuction();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading today's auction data...</h4></div>;
  }

  if (error) {
    return <div className="container-fluid min-vh-100 bg-light text-center pt-5"><div className="alert alert-danger">{error}</div></div>;
  }

  if (auctionData.length === 0) {
    return <div className="container-fluid min-vh-100 bg-light text-center pt-5"><h4>No auctions today.</h4></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Today's Auction</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Lot No.</th>
              <th>Product Name</th>
              <th>Quantity (kg)</th>
              <th>Base Price (Rs.)</th>
              <th>Final Bid (Rs.)</th>
              <th>Winner</th>
              <th>Consignor Name</th>
              <th>Product Type</th>
            </tr>
          </thead>
          <tbody>
            {auctionData.map((item, index) => (
              <tr key={index}>
                <td>{item.LotNo}</td>
                <td>{item.ProductName}</td>
                <td>{item.ProductQuantity}</td>
                <td>{item.BasePrice}</td>
                <td>{item.finalBid || 'N/A'}</td>
                <td>{item.Winner || 'No Winner'}</td>
                <td>{item.ConsignorName}</td>
                <td>{item.ProductType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayAuction;
