import React from "react";
import logoSofi from "../assets/images/Sofi_logo.png";

export default function Footer() {
  return (
    <footer className="bg-white text-center text-[#053E53] py-16 flex flex-col items-center">
      <div className="flex flex-col items-center"></div>
      <h3 className="text-5xl font-semibold mb-4 text-[#053E53] ">
        Thanks for looking
      </h3>
      <p className="mt-2 text-pretty text-lg font-medium text-[#065471]">
        Check out more of my work!
      </p>

      <div className="flex justify-between items-center">
        <a href="https://sofimorales.com/" target="_blank">
          <img src={logoSofi} alt="logoSofi" className="w-28 h-auto" />
        </a>
      </div>
    </footer>
  );
}
