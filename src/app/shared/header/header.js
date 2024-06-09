import React from "react";

import "./header.scss";
import { logo } from "../../../assets/images";


export const Header = () => {
  return (
    <React.Fragment>
      <div className="header-component">
        <div className="logo">
          <img
            src={logo}
            alt="Indian Army Logo"
          />
          </div>
        <div className="title">9th Battalion The Rajputana Rifles Inventory Management System </div>
      </div>
    </React.Fragment>
  );
};
