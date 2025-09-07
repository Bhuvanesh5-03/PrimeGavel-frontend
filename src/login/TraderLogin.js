import { useState } from "react";
import { useNavigate } from "react-router-dom";


function TraderLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const navi = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    setMessage("");

    fetch('http://localhost:5000/traderlogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailid: user, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('Usertoken', data.token);
          localStorage.setItem('emailid', user);
          setMsgType("success");
          setMessage("Login successful! Redirecting...");
          setTimeout(() => navi('/TraderPage'), 1000);
        } else {
          setMsgType("error");
          setMessage(data.message);
        }
      })
      .catch(() => {
        setMsgType("error");
        setMessage("Something went wrong. Please try again!");
      });
  }

  return (
  <div className=" container  w-50  border rounded shadow p-5 mb-5 mt-5 bg-white" >
        <p className="text-center display-6 mb-4 tcolor">Trader Login</p>

        <form onSubmit={handleChange}>
          <div className="form-group mt-3">
            <label className="form-label">EmailId</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label className="form-label">Password</label>
            <div className="d-flex gap-2">
              <input
                type={visible ? "text" : "password"}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setVisible(prev => !prev)}
                className="btn btn-light"
              >
                <i className={`bi ${visible ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
            <p className="text-primary mt-2"
              onClick={() => navi('/ForgotPassword')}
              style={{ cursor: "pointer" }}>
              Forgot Password?
            </p>
          </div>

          {message && (
            <div className={`text-center mt-2 ${msgType === "success" ? "text-success" : "text-danger"}`}>
              {message}
            </div>
          )}

          <div className="text-center">
            <input type="submit" className="btn btn-primary text-white m-3" value="Login" />
          </div>
        </form>

        <div className="text-center">
          <input
            type="button"
            className="btn btn-danger"
            onClick={() => navi('/TraderSignUp')}
            value="Create an account"
          />
        </div>
      </div>
  );
}

export default TraderLogin;
