import "./Header.css";

import logo2 from "../../assets/Logo_ELVA.jpeg";
import logo1 from  "../../assets/Logo_Gibraltar.jpg";

function Header() {
  return (
    <div className="header-container">

      <div className="logo-box">
        <img src={logo1} alt="Logo 1" className="logo-img" />
      </div>

      <h1>Gibraltar Visual AI</h1>

      <div className="logo-box">
        <img src={logo2} alt="Logo 2" className="logo-img" />
      </div>

    </div>
  );
}

export default Header;