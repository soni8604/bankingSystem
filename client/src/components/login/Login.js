import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bank from '../bank/Bank' 
import "./Login.css"

const Login = () => {
    const navigate = useNavigate()

    const [view, setView] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const submitData = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then(res => res.json()).then(data => {
            if (data.message.err) console.log(data.mesaage)
            if (data.message === "Incorrect Password") {
                alert('wrong credential')
                navigate('/')
            }
            if (data.message === "USER NOT REGISTERED") {
                alert('wrong credential')
                navigate('/')
            }
            if (data.message === "Success") {
                sessionStorage.setItem('accessToken', data.token)
                sessionStorage.setItem('userId',data.email)
                navigate('/bank')
            }
        })
    }


    return (
        <>
            <div className="containers">
            
                <div className="form-container">
                
                <form className="loginForm" onSubmit={(e) => submitData(e)}>
                    <h3>Account Login</h3>
                            <input type="email" name="email" value={data.email} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} id="" className="user-id" placeholder="User ID" required />
                            <br />
                            <div style={{ position: "relative" }}>
                                <input type={view ? "text" : "password"} name="password" value={data.password} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} className="password" placeholder="Password" required />
                            </div>
                            <button type="submit" className="loginButton" style={{ cursor: "pointer" }}>LOGIN</button>
                            <button onClick={() => navigate('/signup')} className="sign-up" style={{ cursor: "pointer" }}>REGISTER</button>
                        
                        </form>
                        
                </div>
            </div>
        </>
    )
}

export default Login;