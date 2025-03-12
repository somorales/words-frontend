import React from "react";
import logoFooter from "../assets/images/Sm-footer.png";

export default function Footer() {
  return (
    <footer className="bottom-[0.2cm] left-0 right-0 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-6">
          <div className="flex justify-between items-center">
            <a href="https://sofimorales.com/" target="_blank">
              <img src={logoFooter} alt="logoSofi" className="w-28 h-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
