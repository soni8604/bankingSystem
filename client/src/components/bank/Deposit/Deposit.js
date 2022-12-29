import React from "react";
import './Deposit.css'
const Deposit=({showModel,setShowModel,visible,data,depositAmount})=>{
    if (!visible) return null;
    const cancel = () => {
        setShowModel(!showModel);
    };
    const okk=()=>{
        depositAmount()
        setShowModel(!showModel);
        data(0)
    }
    return (
        <div id="main-container">
          <div className="short-container">
            <h1><img src="https://img.icons8.com/ios-filled/50/null/deposit.png"/> Deposit Amount</h1>
            <div className="inputContainer">
                <input type="number" onChange={(e)=>data(e.target.value)} placeholder="Please enter your amount" required/>
            </div>
            
            <div className="buttons">
              <button className="cancel" onClick={cancel}>
                CANCEL
              </button>
              <button type="submit" className="ok" onClick={okk}>
                ok
              </button>
            </div>
          </div>
        </div>
      );
}
export default Deposit;
