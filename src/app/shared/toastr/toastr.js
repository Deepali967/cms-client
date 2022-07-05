import React from "react";

import "./toastr.scss";

export const Toastr = ({ type = "success", message }) => {
  return (
    <React.Fragment>
      <div className="toastr-component">
        <div className={`message ${type}`}>{message}</div>
      </div>
    </React.Fragment>
  );
};
