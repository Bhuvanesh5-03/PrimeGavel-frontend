import React, { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("Message sent successfully ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message ❌");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("Something went wrong ❌");
    }
  };
  return (
    <>
      <div >
        {/* Hero Division */}
        <div className="bg-light text-dark text-center py-5 shadow mt-5 border">
          <div className="container">
            <h1 className="display-4 fw-bold tcolor">
              Empowering Farmers, Connecting Traders
            </h1>
            <p className="lead mt-3">
              Bid smarter, earn better – Join{" "}
              <span className="fw-bold">Prime Gavel</span> today.
            </p>
          </div>
        </div>

        {/* How It Works Division */}
        <div className="py-5">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <div className="card p-3 shadow-sm">
                  <h3>1️⃣ Register</h3>
                  <p>Create an account as Trader.</p>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card p-3 shadow-sm">
                  <h3>2️⃣ Join Auctions</h3>
                  <p>Join live auctions.</p>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card p-3 shadow-sm">
                  <h3>3️⃣ Bid & Win</h3>
                  <p>Compete fairly and secure the best deals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Division */}
        <div className="py-5 text-center bg-light border shadow">
          <div className="container">
            <h2 className="mb-4 tcolor">Why Choose Prime Gavel?</h2>
            <div className="row">
              <div className="col-md-4 shadow">
                <h4>🌾 Farmer-Focused</h4>
                <p>Helping farmers get maximum profit for their yield.</p>
              </div>
              <div className="col-md-4 shadow">
                <h4>⚖️ Transparent Bidding</h4>
                <p>Every bid is fair and visible to all participants.</p>
              </div>
              <div className="col-md-4 shadow">
                <h4>💰 Fair Pricing</h4>
                <p>Buyers and sellers both benefit from real competition.</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Division */}
        <div className="py-5 bg-white mt-5 border shadow" id="about">
          <div className="container text-center">
            <h2 className="mb-4 tcolor">About Us</h2>
            <p className="lead">
              Prime Gavel is an online auction platform designed to connect
              farmers and traders. Our mission is to create transparency,
              fairness, and maximum profit for farmers while enabling traders to
              access quality produce directly.
            </p>
          </div>
        </div>

        {/* Contact Us Division */}
        <div className="py-5 bg-light mb-5 mt-5 border shadow" id="contact">
          <div className="container">
            <h2 className="text-center mb-4 tcolor">Contact Us</h2>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="message"
                      className="form-control"
                      rows="4"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Send Message
                  </button>
                </form>
                {status && (
                  <p className="text-center mt-3">
                    <strong>{status}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}