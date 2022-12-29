import React from "react";
import './Withdraw.css'
const Withdraw=({showModel,setShowModel,visible,data,withdrawAmount})=>{
    if (!visible) return null;
    const cancel = () => {
        setShowModel(!showModel);
    };
    const okk=()=>{
        withdrawAmount()
        setShowModel(!showModel);
        data(0)
    }
    const value=(e)=>{
      data(e.target.value)
    }
    return (
        <div id="main-container">
          <div className="short-container">
            <h1><img src="https://img.icons8.com/external-sbts2018-mixed-sbts2018/32/null/external-05-withdraw-money-finance-basic-2-sbts2018-mixed-sbts2018-2.png"/> Withdraw Amount</h1>
            <div className="inputContainer">
                <input type="number" onChange={value} placeholder="Please enter your amount" required/>
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
export default Withdraw;
