import React, { useEffect, useState } from 'react'

const AuctionDetail = () => {
  const [lotno, setlotno] = useState(1);
  const [img, setImage] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState(false);
  const [submit, setSubmit] = useState(false);

  function handleImage(e) {
    const image = e.target.files[0];
    if (image) {
      setImage(URL.createObjectURL(image));
    }
  }

  useEffect(() => {
    fetch("https://primegavel-backend.onrender.com/Count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(d => {
        setlotno(parseInt(d.count)); // Set directly to the next count from backend (no +1 here)
      })
      .catch(err => console.error("Error fetching lot count:", err));
  }, []); // Empty dependency array: runs only once on mount

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      LotNo: lotno,
      ConsignorName: e.target.cosignorName.value,
      ProductType: type,
      ProductQuantity: parseInt(e.target.productQuantity.value),
      ProductName: e.target.productName.value,
      BasePrice: parseInt(e.target.basePrice.value),
      Image: img,
      Winner: ""
    };
    fetch("https://primegavel-backend.onrender.com/auctionDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(d => {
        if (d.success) {
          setState(true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        setSubmit(true);
      })
      .catch(err => console.error("Error submitting auction detail:", err));
  }

  return (
    <div className='container border rounded shadow w-50 mt-5'>
      <div className='container '>
        <p className='display-6 m-4 text-center'>Consignor Details</p>
        <form onSubmit={handleSubmit}>
          <div className='form-group mb-3'>
            <label className='form-label'>Lot No.</label>
            <input type="text" className='form-control' name="lotNo" value={lotno} disabled />
          </div>
          <div className="form-group mb-3">
            <label className='form-label '>Consignor Name</label>
            <input type="text" className='form-control' name="cosignorName" required />
          </div>
          <div className="form-group mb-3">
            <label className='form-label'>Product Type</label>
            <select className="form-select" onChange={(e) => { setType(e.target.value) }} required>
              <option value="NotSelected">Choose product type</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Cereals">Cereals & Grains</option>
              <option value="Pulses">Pulses</option>
              <option value="OilSeeds">Oil Seeds</option>
              <option value="Plantation">Plantation & Tree Crops</option>
              <option value="Timber">Timber & Wood</option>
              <option value="Fodder">Fodder Crops</option>
            </select>
          </div>
          <div className='form-group mt-3'>
            <label className='form-label '>Product Name</label>
            <input type="text" className='form-control' name="productName" required />
          </div>
          <div className='form-group mt-3'>
            <label className='form-label '>Product Quantity</label>
            <input type="number" className='form-control' name="productQuantity" required />
          </div>
          <div className='form-group mt-3'>
            <label className='form-label '>Base Price</label>
            <input type="number" className='form-control' name="basePrice" min="1" required />
          </div>
          <div className='form-group mt-3'>
            <label className='form-label'>Upload Image</label>
            <input type="file" accept='image/*' className='form-control' name="image" onChange={handleImage} required />
          </div>
          {submit && <p className={state ? 'text-success' : 'text-danger'}>{state ? "Inserted SuccessFully" : "Failed to insert"}</p>}
          <div className="text-center mt-3 mb-3">
            <input type="submit" className='btn btn-info' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuctionDetail
