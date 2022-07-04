import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./add-faq-content.scss";

const AddFAQContent = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const updateRecord = () => {
    axios
      .put(`${process.env.REACT_APP_API_HOST}/faq/${recordId}`, inputs)
      .then((res) => {
        navigate("/content", {
          state: {
            type: "faq",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createRecord = () => {
    axios
      .post(`${process.env.REACT_APP_API_HOST}/faq`, inputs)
      .then((res) => {
        navigate("/content", {
          state: {
            type: "faq",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitContent = () => {
    if (recordId) {
      updateRecord();
    } else {
      createRecord();
    }
  };

  const cancel = () => {
    setInputs({});
  };

  let location = useLocation();
  let navigate = useNavigate();

  let recordId = location?.state?.id;

  console.log(recordId);

  useEffect(() => {
    if (recordId) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/faq/${recordId}`)
        .then((response) => {
          if (response.data) {
            setInputs(response.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="add-content-component">
        <form>
          <div className="form-field name">
            <label>Question / Title:</label>
            <input
              type="text"
              name="title"
              value={inputs?.title || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-field name">
            <label>Answer / Description:</label>
            <textarea
              type="text"
              name="description"
              value={inputs?.description || ""}
              onChange={handleChange}
              rows={"5"}
              colums={"7"}
            ></textarea>
          </div>

          <div className="cta-blocks">
            <div className="btn submit" onClick={submitContent}>
              Submit
            </div>

            <div className="btn cancel" onClick={cancel}>
              Cancel
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddFAQContent;
