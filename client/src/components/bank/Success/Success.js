import React from "react";
import './Success.css'
const Success=({showModel,setShowModel,visible})=>{
    if (!visible) return null;
    const cancel = () => {
        setShowModel(!showModel);
    };
    return (
        <div id="main-container" onClick={cancel}>
          <div className="short-container">
            <img src="https://img.icons8.com/color/240/null/ok--v1.png"/>
            <h1>Successfull</h1>
          </div>
        </div>
      );
}
export default Success;