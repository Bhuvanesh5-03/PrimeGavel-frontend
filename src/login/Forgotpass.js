import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Forgotpass = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [send, setSend] = useState(false);
    const [visible, setVisible] = useState(false);
    const [Cvisible, setCVisible] = useState(false);
    const [message, setMessage] = useState("");   // ✅ message state
    const [msgType, setMsgType] = useState("");   // ✅ "success" or "error"

    const navi = useNavigate();

    function handleMail(e) {
        e.preventDefault();
        const emailid = document.getElementById('email');
        if (emailid.value !== "") {
            fetch("http://localhost:5000/traderLogin/forgotPassword", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailid: emailid.value })
            })
                .then(res => res.json())
                .then(d => {
                    if (d.success) {
                        setEmail(emailid.value);
                        emailid.disabled = true;
                        setMessage("For verification code check your mail.");
                        setMsgType("success");
                        setSend(true);
                    } else {
                        setEmail("");
                        setMessage("Email ID does not exist.");
                        setMsgType("error");
                    }
                });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget; // ✅ use form not button
        const confirm = form.elements.confirmpassword.value;
        const password = form.elements.password.value;
        const code = form.elements.code.value;

        if (confirm === password) {
            fetch("http://localhost:5000/traderLogin/CheckCode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailid: email,
                    newPassword: password,
                    code: parseInt(code)
                })
            })
                .then(res => res.json())
                .then(d => {
                    if (d.success) {
                        setMessage(d.message);
                        setMsgType("success");
                        setTimeout(() => {
                            navi('/TraderLogin');
                        }, 5000);
                    } else {
                        setMessage(d.message);
                        setMsgType("error");
                    }
                });
        } else {
            setError(true);
        }
    }

    return (
        <div className="container border rounded w-50 shadow mt-5 mb-5 bg-white">
            <div className="container">
                <p className="text-center display-6 m-4 tcolor">Password Reset</p>

                {/* ✅ message box */}
                {message && (
                    <div className={`alert ${msgType === "success" ? "alert-success" : "alert-danger"}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3 mb-3">
                        <label className="form-label">EmailId</label>
                        <div className='d-flex gap-3'>
                            <input type="email" className="form-control" name="Username" id="email" required />
                            <button className='btn btn-primary' onClick={handleMail}>Send</button>
                        </div>
                    </div>

                    {send && <div>
                        <div className="form-group mt-3">
                            <label className="form-label">Verification code</label>
                            <input type="number" className="form-control" name="code" required />
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-label">Password</label>
                            <div className='d-flex gap-3'>
                                <input
                                    type={visible ? 'text' : 'password'}
                                    className="form-control"
                                    name="password"
                                    required
                                />
                                <button type='button' onClick={() => setVisible(prev => !prev)} className="btn btn-light">
                                    <i className={`bi ${visible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-label">Confirm Password</label>
                            <div className='d-flex gap-3'>
                                <input
                                    type={Cvisible ? 'text' : 'password'}
                                    className="form-control"
                                    name="confirmpassword"
                                    required
                                />
                                <button type='button' onClick={() => setCVisible(prev => !prev)} className="btn btn-light">
                                    <i className={`bi ${Cvisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className='text-danger'>Password and Confirm password do not match</p>
                        )}

                        <div className="text-center">
                            <input type="submit" className="btn btn-primary text-white m-3" value="Submit" />
                        </div>
                    </div>}
                </form>
            </div>
        </div>
    )
}

export default Forgotpass;
