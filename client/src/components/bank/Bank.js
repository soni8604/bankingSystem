import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import './Bank.css'
import Withdraw from './withdraw/Withdraw'
import Success from "./Success/Success";
import Deposit from './Deposit/Deposit'
import Balance from "./Balance/Balance";
const Bank=()=>{
    const userId=sessionStorage.getItem("userId")
    const [showModel,setShowModel]=useState(false)
    const [data,setData]=useState(0)
    const [success,setSuccess]=useState(false)
    const[deposit,setDeposit]=useState(false)
    const[balace,setBalance]=useState(false)
    const[show,setShow]=useState()
    const navigate = useNavigate()

    const logout=()=>{
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userId");
        navigate("/");
    }
    const withdrawAmount=()=>{
        if(data===0){
            alert('please enter valid amount')
            setSuccess(false)
        }
        fetch("http://localhost:3001/withdraw", {
                method: "post",
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount:data
                })
            }).then(res => res.json()).then(data => {
                if (data.message) console.log(data.message)
                if(data.message==="successfull"){
                    setSuccess(true)
                }
                if(data.message==="Insufficiant balance"){
                    alert("Insufficiant balance")
                }
                if(data.message==="amount must be greater than 0"){
                    alert("amount must be greater than 0")
                }           
             })
    }
    const depositAmount=()=>{
        if(data===0){
            alert('please enter valid amount')
            setSuccess(false)
        }
        fetch("http://localhost:3001/deposit", {
                method: "post",
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount:data
                })
            }).then(res => res.json()).then(data => {
                if (data.message) console.log(data.mesaage)
                if(data.message==="successfull"){
                    setSuccess(true)
                }
            })
    }
    const balanceAmount=()=>{
        fetch("http://localhost:3001/request", {
            method: "get",
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            if (data.message) console.log(data.mesaage)
            if(data.message==="success"){
                setShow(data.amount)
            }
            
        })
    }
    useEffect(()=>{
        if(!sessionStorage.getItem("accessToken")){
            navigate("/")
        }
    })
    useEffect(()=>{
        balanceAmount()
    },[balace])
    
    return(
        <>  
        <header>
            <h3>WELCOME {userId.split('@')[0].toUpperCase()}</h3>
        </header>
            <div className="buttonContainer">
                <div>
                    <button onClick={()=>setShowModel(true)}><img src="https://img.icons8.com/material-rounded/24/ffffff/initiate-money-transfer.png"/> Withdraw Amount</button>
                    <button onClick={()=>setDeposit(true)}><img src="https://img.icons8.com/ios-glyphs/24/ffffff/deposit.png"/> Deposit Amount</button>
                    <button onClick={()=>setBalance(true)}><img src="https://img.icons8.com/material-sharp/24/ffffff/money-yours.png"/> Request Balance</button>
                </div>
                <Withdraw setShowModel={setShowModel}
                            showModel={showModel}
                            visible={showModel} 
                            data={setData}
                            withdrawAmount={withdrawAmount}
                            />
                <Success setShowModel={setSuccess}
                            showModel={success}
                            visible={success} />
                <Deposit setShowModel={setDeposit}
                            showModel={deposit}
                            visible={deposit} 
                            data={setData}
                            depositAmount={depositAmount}
                            />
                <Balance setShowModel={setBalance}
                            showModel={balace}
                            visible={balace} 
                            data={show}
                            balanceAmount={balanceAmount} />
                
            </div>
            <footer>
            <div className="logoutButton">
                    <button onClick={logout}> <img src="https://img.icons8.com/ios/25/ffffff/exit--v1.png"/> Logout</button>
                </div>
            </footer>
            
        </>
    )
}
export default Bank;
