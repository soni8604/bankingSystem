import { useNavigate } from "react-router-dom";
import './Home.css'
function HomePage() {
    const navigate = useNavigate();
  
    return (
    <>
            
        <div className="main-container">
            <h1>Welcome To Banking System</h1>
            <div ><button style={{backgroundColor:"rgb(117, 150, 228)"}} onClick={() => navigate('/login')}>Login</button>
            <button style={{backgroundColor:"rgb(42, 171, 42)"}} onClick={() => navigate('/signup')}>Register</button></div>  
        </div>
        
    </>
    );
  }
  export default HomePage;
  