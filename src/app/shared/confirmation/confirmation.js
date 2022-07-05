import axios from "axios";
import React from "react";

import "./confirmation.scss";

export const Confirmation = ({ articleType, record, emitAction }) => {
  const deleteRecord = () => {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/${articleType}/${record._id}`)
      .then((res) => {
        emitAction();
      })
      .catch((err) => {});
  };

  console.log(record);

  return (
    <React.Fragment>
      <div className="confirmation-dialog">
        <div className="confirmation-content">
          <div className="record">Record title : {record?.title || ""}</div>

          <div className="header">
            Are you sure you want to delete above record?
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
