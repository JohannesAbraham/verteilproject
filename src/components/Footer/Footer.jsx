import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="div-block-2">
      <div className="container w-container">
        <div className="div-block">
          <p className="copy-right">
            © Verteil Technologies Pvt Ltd. 2017-2023 . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
