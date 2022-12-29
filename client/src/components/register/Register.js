import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import "./Register.css"

const Register = () => {
    const navigate = useNavigate()
    const [match, setMatch] = useState(false)
    const [length, setLength] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
        cinfpassword: ""
    })

    if (match === true) {
        if (data.password === data.cinfpassword) {
            setMatch(false)
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (data.password !== data.cinfpassword) {
            return setMatch(true)
        } else {
            if (length) {
                return
            }
            fetch('http://localhost:3001/register', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            }).then(res => res.json()).then(data => {

                if (data.message === 'email is already registered') {
                    setRegistered(true)
                    return alert("User is already registered. Please log in.")
                }
                alert('Registered Successfully')
                navigate('/login')

            })
        }
    }
    if (data.password.length >= 1 && length !== true) {
        if (data.password.length < 6 || data.password.length === "") {
            setLength(!length)
        }

    }
    if (length) {
        if (data.password.length >= 6) {
            setLength(false)
        }
    }
    if (data.password === "" && length === true) {
        setLength(false)
    }
    if (match) {
        var styleObj = {
            borderColor: "tomato"
        }

    }


    return (
        <>
            <div className="container">
                <div className="main">
                    
                    <div className="middleContainer">
                        
                        <form onSubmit={(e) => submitForm(e)} className="loginForm" action="">
                        <h1 className="logo">Open New Account</h1>
                            <input type="email" name="email" id="" value={data.email} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} className="user-id" placeholder="Mail ID" required />
                            <br />
                            <div style={{ position: "relative" }} >
                                <input type="password" style={styleObj} name="password" value={data.password} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} className="password" placeholder="Password" required />
                                {
                                    length && <span style={{ position: "absolute", top: 35, right: 10, fontSize: "11px", color: 'tomato' }} >Password too weak minimum length(6)</span>
                                }
                            </div>
                            <div style={{ position: "relative" }} >
                                <input type="password" style={styleObj} name="cinfpassword" value={data.cinfpassword} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} className="password" placeholder="Confirm Password" required />
                                {match && <span style={{ position: "absolute", right: 13, top: 38, fontSize: "12px", color: "tomato" }}>Password not match</span>}
                            </div>

                            <button className="regButton" style={{ cursor: "pointer" }}>REGISTER</button>
                            <Link style={{ color: "#7D8CC4" }} to="/" >Exit</Link>
                            
                        </form>
                        {
                            registered &&<div className="afterReg">
                                <p style={{ color: "grey" }}>or</p>

                                <Link style={{ color: "#7D8CC4" }} to="/login" >Sign in</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;