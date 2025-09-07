import { useNavigate } from "react-router-dom";
import { useState } from 'react'
function AuctioneerLogin(props) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [visible , setVisible] = useState(false);
    const navi = useNavigate();
    const users = [{ name: "Bhuvanesh", password: "Bhuvanesh.50" }, { name: "Srisam Raagosh", password: "Srisam@2005" }]
    function handleSubmit(e) {
        e.preventDefault();
        const found = users.find((u) => (u.name === user && u.password === password))
        if (found) {
            navi('/AuctionDetail');
        }
        else {
            alert('Invalid login');
            window.location.reload();
        }
    }
    return (
        <div className="container-fluid border rounded w-50 shadow mt-5 mb-5 bg-white">
            <div className="container">
                <p className="text-center display-6 m-4 tcolor">Auctioneer Login</p>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                        <label className="form-label">UserName</label>
                        <input type="text" className="form-control  " name="Username" onChange={(e) => { setUser(e.target.value) }} />
                    </div>
                    <div className="form-group mt-3">
                    <label className="form-label">Password</label>
                    <div className="d-flex gap-2">
                        <input type={visible?'text':'password'} className="form-control " name="password" id="auctionPass" onChange={(e) => { setPassword(e.target.value) }} />
                        <button type='button' onClick={() =>setVisible(prev=>!prev)} className="btn btn-light ">
                            <i className={`bi ${visible?'bi-eye-slash':'bi-eye'}`}></i>
                        </button>
                    </div>
                    </div>
                    <div className="text-center">
                        <input type="submit" className="btn btn-primary text-white m-3" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AuctioneerLogin;
