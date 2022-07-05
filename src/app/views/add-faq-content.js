import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toastr } from "../shared/toastr/toastr";

import "./add-faq-content.scss";

const AddFAQContent = () => {
  const handleChange = (e) => {
    if (showErrors) {
      setShowErrors(false);
    }

    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));

    validateuserInput(name, value);
  };

  const validateuserInput = (field, userValue) => {
    let validationProperties = properties[field];

    if (userValue.trim().length < validationProperties.minLength) {
      setErrorObj(
        Object.assign(errorObj, {
          [field]: `Please Enter ${validationProperties.minLength} Valid characters`,
        })
      );
    } else if (userValue.trim().length > validationProperties.maxLength) {
      setErrorObj(
        Object.assign(errorObj, {
          [field]: `Max ${validationProperties.maxLength} characters Allowed`,
        })
      );
    } else if (!validationProperties.pattern.test(userValue)) {
      setErrorObj(
        Object.assign(errorObj, {
          [field]: `Only Alphabets, Numbers and (&'/(),?.) are allowed`,
        })
      );
    } else {
      setErrorObj(
        Object.assign(errorObj, {
          [field]: "",
        })
      );
    }
  };

  const updateRecord = () => {
    axios
      .put(`${process.env.REACT_APP_API_HOST}/faq/${recordId}`, inputs)
      .then((res) => {
        setToastr(
          Object.assign(toastr, { type: "success", message: res.data.message })
        );
        toggletostr();

        setTimeout(() => {
          toggletostr();
          navigate("/content", {
            state: {
              type: "faq",
            },
          });
        }, 2000);
      })
      .catch((err) => {
        setToastr(
          Object.assign(toastr, {
            type: "error",
            message: err?.data?.response?.message || "Error",
          })
        );
        toggletostr();

        setTimeout(() => {
          toggletostr();
        }, 1000);

        console.log(err);
      });
  };

  const createRecord = () => {
    axios
      .post(`${process.env.REACT_APP_API_HOST}/faq`, inputs)
      .then((res) => {
        setToastr(
          Object.assign(toastr, { type: "success", message: res.data.message })
        );
        toggletostr();

        setTimeout(() => {
          toggletostr();

          setToastr(Object.assign(toastr, {}));

          navigate("/content", {
            state: {
              type: "faq",
            },
          });
        }, 2000);
      })
      .catch((err) => {
        setToastr(
          Object.assign(toastr, {
            type: "error",
            message: err?.response?.data?.message || "Error",
          })
        );
        toggletostr();

        setTimeout(() => {
          toggletostr();
        }, 1000);

        console.log(err);
      });
  };

  const toggletostr = () => {
    showToastr = !showToastr;
    setShowToastr(showToastr);
  };

  const submitContent = () => {
    let key = Object.keys(errorObj).filter((key) => errorObj[key] !== "");

    if (key.length) {
      setShowErrors(true);
      return;
    }

    if (recordId) {
      updateRecord();
    } else {
      createRecord();
    }
  };

  const cancel = () => {
    setInputs({});
    navigate("/");
  };

  const resetErrors = () => {
    setErrorObj(Object.assign(errorObj, { title: "", description: "" }));
  };

  let location = useLocation();
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  let recordId = location?.state?.id;
  let [toastr, setToastr] = useState({
    type: "",
    message: "",
  });

  let [showToastr, setShowToastr] = useState(false);

  let [properties, setProperties] = useState({
    title: {
      minLength: 2,
      maxLength: 30,
      pattern: new RegExp("[a-zA-Z&'/(),?.\\- ]*"),
    },

    description: {
      minLength: 10,
      maxLength: 400,
      pattern: new RegExp("[a-zA-Z0-9&'/(),?.\\- ]*"),
    },
  });

  let [errorObj, setErrorObj] = useState({
    title: "Field is Required",
    description: "Field is Required",
  });

  let [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (recordId) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/faq/${recordId}`)
        .then((response) => {
          if (response.data) {
            setInputs(response.data.data);
            resetErrors();
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

            <div className="count">
              {inputs?.title?.length
                ? inputs?.title?.length <= properties?.title.maxLength
                  ? inputs?.title?.length
                  : properties?.title.maxLength
                : 0}
              /{properties?.title.maxLength}
            </div>
          </div>

          {showErrors && errorObj?.title ? (
            <div className="error">{errorObj?.title}</div>
          ) : (
            <></>
          )}

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

            <div className="count">
              {inputs?.description?.length
                ? inputs?.description?.length <=
                  properties?.description.maxLength
                  ? inputs?.description?.length
                  : properties?.description.maxLength
                : 0}
              /{properties?.description.maxLength}
            </div>
          </div>

          {showErrors && errorObj?.description ? (
            <div className="error">{errorObj?.description}</div>
          ) : (
            <></>
          )}

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

      {showToastr ? (
        <Toastr type={toastr.type} message={toastr.message} />
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default AddFAQContent;
