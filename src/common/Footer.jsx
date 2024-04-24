import React from "react";

const Footer = () => {
  return (
    <footer
      className=" text-[#333333]"
      style={{ borderTop: "2px solid lightgray" }}
    >
      <div className=" laptop:text-[12px] mobile:text-[10px] container mx-auto flex justify-between items-center">
        <div className="">
          <p>Copyright © 2022 Maiden Cube Pvt Ltd. All rights reserved.</p>
        </div>
        <div>
          <p>
            <a href="/privacy-policy" className="text-[#333333] ">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="/terms-and-conditions" className="text-[#333333] ">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
