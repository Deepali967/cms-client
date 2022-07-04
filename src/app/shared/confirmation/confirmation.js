import axios from "axios";
import React from "react";

import "./confirmation.scss";

export const Confirmation = ({ articleType, recordId, emitAction }) => {
  const deleteRecord = () => {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/${articleType}/${recordId}`)
      .then((res) => {
        emitAction();
      })
      .catch((err) => {});
  };

  return (
    <React.Fragment>
      <div className="confirmation-dialog">
        <div className="confirmation-content">
          <div className="header">
            Are you sure you want to delete the record?
          </div>
          <div className="cta-blocks">
            <div className="btn" onClick={emitAction}>
              Cancel
            </div>
            <div className="btn" onClick={deleteRecord}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
