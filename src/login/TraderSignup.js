import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TraderSignup = () => {
    const [noti, setNoti] = useState(false)
    const [number, setNumber] = useState('')
    const [visible,setVisible]=useState(false)
    const navi = useNavigate()
    function phoneNumber(e) {
        if (e.target.value.length < 10) {
            setNoti(true);
        }
        else if (e.target.value.length === 10) {
            setNoti(false);
            setNumber(e.target.value);
        }
        else {
            setNoti(true);
        }
    }
    function handleSubmit(e) {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.emailid.value;
        const password = e.target.pass.value;
        fetch("https://primegavel-backend.onrender.com/traderSignup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, emailid: email, password: password, phoneNumber: parseInt(number) })
        }).then(res => res.json()).then(d => {
            if (d.success) {
                alert("SignUp Successfully");
                navi('/TraderLogin');
            }
            else {
                alert("Email already exists");
                window.location.reload();
            }
        })

    }
    function handleEvent() {
        navi('/TraderLogin')
    }
    return (
        <div className='container border rounded w-50 shadow mt-5 bg-white mb-5'>
            <div className='container mt-5'>
                <p className='display-6 m-4 text-center tcolor'>Trader SignUp</p>
                <form onSubmit={handleSubmit}>
                    <div className='form-group mb-3'>
                        <label className='form-label'>Name</label>
                        <input type="text" name='name' className='form-control' required />
                    </div>
                    <div className='form-group mb-3'>
                        <label className='form-label'>Email id</label>
                        <input type="email" name='emailid' className='form-control' required />
                    </div>
                    <div className='form-group mb-3'>
                        <label className='form-label'>password</label>
                        <div className='d-flex gap-3'>
                        <input type={visible?'text':'password'} name='pass' className='form-control' required />
                        <button type='button' onClick={() => setVisible(prev => !prev)}  className="btn btn-light ">
                                <i className={`bi ${visible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                            </div>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='form-label'>Phone Number</label>
                        <input type="number" name='phone' className='form-control' onChange={phoneNumber} required />
                        {noti && <p className='text-danger'>Enter valid mobile number</p>}
                    </div>
                    <div className='form-group mb-3 text-center'>
                        <input type="submit" className='btn btn-primary text-white' />
                    </div>
                    <div className='container text-center mb-3'>
                        <p className='text-primary' onClick={handleEvent}>Already have an account?</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TraderSignup