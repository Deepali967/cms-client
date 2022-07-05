import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { COLUMNS } from "../../assets/constants/app-constants";
import { edit_ic, delete_ic } from "../../assets/images";

import { Confirmation } from "../shared/confirmation/confirmation";

import "./view-content.scss";

const ViewContent = () => {
  const deleteRecord = (record) => {
    setCurrentSelectedRecord(record);
    toggleconfirmation();
  };

  const toggleconfirmation = () => {
    showConfirmtion = !showConfirmtion;
    setConfirmatioFlag(showConfirmtion);
  };

  const updateRecord = (data) => {
    navigate(`/${articleType}`, {
      state: {
        id: data._id,
      },
    });
  };

  const addRecord = () => {
    navigate(`/${articleType}`);
  };

  const navigateToHome = () => {
    navigate("/index.html");
  };

  const renderContent = () => {
    if (!data.length) {
      return;
    }

    return (
      <React.Fragment>
        {data.map((data) => {
          return (
            <tr key={data._id}>
              {columns.map((column) => {
                return (
                  <React.Fragment key={column?.id}>
                    {column?.id === "image" ? (
                      <td className="image-element" key={column?.id}>
                        {data.image ? (
                          <img src={data.image} alt="data" />
                        ) : (
                          "No Preview Available"
                        )}
                      </td>
                    ) : (
                      <td key={column?.id}>
                        {data[column?.id] || "No Preview Available"}
                      </td>
                    )}
                  </React.Fragment>
                );
              })}
              <td className="actions">
                <img
                  src={edit_ic}
                  alt=""
                  onClick={() => {
                    updateRecord(data);
                  }}
                />
                <img
                  src={delete_ic}
                  onClick={() => {
                    deleteRecord(data);
                  }}
                  alt=""
                />
              </td>
            </tr>
          );
        })}
      </React.Fragment>
    );
  };

  const renderThColumns = () => {
    return (
      <React.Fragment>
        {columns.map((column) => {
          return <th key={column.id}>{column?.text}</th>;
        })}
        <th>Actions</th>
      </React.Fragment>
    );
  };

  let [data, setData] = useState([]);
  let [columns, setColumns] = useState([]);
  let [showConfirmtion, setConfirmatioFlag] = useState(false);
  let [currentSelectedRecord, setCurrentSelectedRecord] = useState();
  let location = useLocation();
  let articleType = location?.state?.type;

  let navigate = useNavigate();

  useEffect(() => {
    setColumns(COLUMNS[articleType]);
    if (articleType) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/${articleType}`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {};
  }, [showConfirmtion]);

  return (
    <React.Fragment>
      <div className="view-content-component">
        {columns && data.length ? (
          <React.Fragment>
            <div className="cta-blocks">
              <div className="btn add" onClick={navigateToHome}>
                Back
              </div>

              <div className="btn add" onClick={addRecord}>
                Add {articleType}
              </div>
            </div>

            <table border="1" className="table-element">
              <thead>
                <tr>{renderThColumns()}</tr>
              </thead>
              <tbody>{renderContent()}</tbody>
            </table>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="no-data-container">
              <div className="text">
                You don't have any content yet. <br />
                Get started here
              </div>

              <div className="cta-blocks">
                <div className="btn add" onClick={navigateToHome}>
                  Back
                </div>

                <div className="btn add" onClick={addRecord}>
                  Add {articleType}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      {showConfirmtion ? (
        <Confirmation
          articleType={articleType}
          record={currentSelectedRecord}
          emitAction={toggleconfirmation}
        />
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default ViewContent;
