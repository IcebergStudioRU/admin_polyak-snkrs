import React from "react";
import "./Header.css"

const Header = () => {
  return (
    <div className="container header_container">
      <ul className="header_pages_container">
        <li className="header_page">CATALOG</li>
        <li className="header_page">QUESTIONS</li>
        <li className="header_page">REVIEW</li>
      </ul>
    </div>
  );
};

export default Header;
