import React from "react";
import logoFooter from "../assets/images/Sm-footer.png";

export default function Footer() {
  return (
    <footer className="py-[22rem] flex flex-col items-center">
      <div className="flex justify-between items-center">
        <a href="https://sofimorales.com/" target="_blank">
          <img src={logoFooter} alt="logoSofi" className="w-28 h-auto" />
        </a>
      </div>
    </footer>
  );
}
