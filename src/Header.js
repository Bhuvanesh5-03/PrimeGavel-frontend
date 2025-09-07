import React from "react";
import logo from "./Images/Logo.png";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // get user email from localStorage
  const email = localStorage.getItem("emailid");

  // logout function
  const logout = () => {
    fetch(`http://localhost:5000/traderLogin/logout/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          localStorage.removeItem("Usertoken");
          localStorage.removeItem("emailid");
          navigate("/");
        } else {
          alert(d.message);
        }
      })
      .catch((err) => console.error("Logout error:", err));
  };

  // profile image
  const profileImg = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div className="banner shadow ">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Left: Logo + Title */}
        <div className="d-flex align-items-center gap-3">
          <img className="logo" src={logo} alt="PrimeGavel Logo" />
          <h1 className="name mb-0 text-shadow">PrimeGavel</h1>
        </div>

        {/* Right: Navigation + Actions */}
        <div className="d-flex align-items-center gap-4">
          {/* Common Nav */}
          <ul className="list mb-0 d-flex gap-3">
            <li><Link to="/">Home</Link></li>
            <li><a href="/#about">About Us</a></li>
            <li><a href="/#contact">Contact Us</a></li>

            {/* Trader-only Nav (visible only if logged in) */}
            {email && (
              <>
                <li><Link to="/traderpage">Trader Dashboard</Link></li>
              </>
            )}
          </ul>

          {email ? (
            // If logged in → Profile + Logout
            <div className="d-flex align-items-center gap-3">
              <img
                src={profileImg}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              />
              <span
                className="text-white fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              >
                {email}
              </span>
              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            // If not logged in → Login + Signup
            <div className="d-flex gap-2">
              <button
  className="btn btn-sm"
  style={{ backgroundColor: "#4CAF50", color: "white", borderRadius: "8px" }}
  onClick={() => navigate("/Selection")}
>
  Login
</button>

<button
  className="btn btn-sm"
  style={{ backgroundColor: "#FF5722", color: "white", borderRadius: "8px" }}
  onClick={() => navigate("/TraderSignup")}
>
  Signup
</button>

      
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
