import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toastr } from "../shared/toastr/toastr";

import "./add-help-content.scss";

const AddHelpContent = () => {
  const toggletostr = () => {
    showToastr = !showToastr;
    setShowToastr(showToastr);
  };

  const handleChange = (e) => {
    setShowErrors(false);

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
          [field]: `Max ${validationProperties.maxLength} Allowed`,
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

    console.log(errorObj);
  };

  const uploadImage = (file) => {
    let formData = new FormData();

    formData.append("image", file);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_HOST}/help/uploadimage`,
        formData,
        config
      )
      .then((res) => {
        setToastr(
          Object.assign(toastr, {
            type: "success",
            message: "Image uploaded successfully",
          })
        );
        toggletostr();

        setTimeout(() => {
          toggletostr();
        }, 2000);

        setInputs((values) => ({ ...values, image: res.data.imageUrl }));

        setCurrentUploadedImage(res.data.imageUrl);
        setImageUpload(true);
      })
      .catch((err) => {
        setToastr(
          Object.assign(toastr, {
            type: "error",
            message: "Error in upload image",
          })
        );
        toggletostr();

        setTimeout(() => {
          toggletostr();
        }, 2000);

        console.log(err);
      });
  };

  const fileChangedHandler = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();

    var sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    /**Capture filename */
    setFilename(file.name);
    console.log(file);
    reader.onload = function (e) {
      setFile(e.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);

    if (sizeInMB > 2) {
      window.alert("Please upload a file smaller than 2 MB");
      return false;
    }

    uploadImage(file);
  };

  const updateRecord = () => {
    axios
      .put(`${process.env.REACT_APP_API_HOST}/help/${recordId}`, inputs)
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
              type: "help",
            },
          });
        });
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

  const createRecord = () => {
    axios
      .post(`${process.env.REACT_APP_API_HOST}/help`, inputs)
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
              type: "help",
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

  const submitContent = () => {
    let errorKeys = Object.keys(errorObj).filter((key) => errorObj[key] !== "");

    if (errorKeys.length) {
      setShowErrors(true);
      return;
    }

    if (recordId) {
      updateRecord();
    } else {
      createRecord();
    }
  };

  const resetErrors = () => {
    setErrorObj(Object.assign(errorObj, { title: "", desc: "", subtitle: "" }));
  };

  const cancel = () => {
    setInputs({});
    navigate("/");
  };

  let location = useLocation();
  let navigate = useNavigate();
  let [isImageUpload, setImageUpload] = useState(false);
  let [inputs, setInputs] = useState({});
  let [file, setFile] = useState(null);
  let [filename, setFilename] = useState("");

  let [properties, setProperties] = useState({
    title: {
      minLength: 2,
      maxLength: 30,
      pattern: new RegExp("[a-zA-Z&'/(),?.\\- ]*"),
    },

    subtitle: {
      minLength: 2,
      maxLength: 30,
      pattern: new RegExp("[a-zA-Z&'/(),?.\\- ]*"),
    },

    desc: {
      minLength: 3,
      maxLength: 300,
      pattern: new RegExp("[a-zA-Z&'/(),?.\\- ]*"),
    },
  });

  let [errorObj, setErrorObj] = useState({
    title: "Field is Required",
    desc: "Field is Required",
    subtitle: "Field is Required",
  });

  let [showErrors, setShowErrors] = useState(false);

  let [toastr, setToastr] = useState({
    type: "",
    message: "",
  });

  let [showToastr, setShowToastr] = useState(false);

  let [currentUploadedImage, setCurrentUploadedImage] = useState(null);
  let recordId = location?.state?.id;

  useEffect(() => {
    if (recordId) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/help/${recordId}`)
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
        <form onSubmit={submitContent}>
          <div className="form-field name">
            <label>Title:</label>
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
            <label>SubTitle:</label>
            <input
              type="text"
              name="subtitle"
              value={inputs?.subtitle || ""}
              onChange={handleChange}
            />

            <div className="count">
              {inputs?.subtitle?.length
                ? inputs?.subtitle?.length <= properties?.subtitle.maxLength
                  ? inputs?.subtitle?.length
                  : properties?.subtitle.maxLength
                : 0}
              /{properties?.subtitle.maxLength}
            </div>
          </div>
          {showErrors && errorObj?.subtitle ? (
            <div className="error">{errorObj?.subtitle}</div>
          ) : (
            <></>
          )}

          <div className="form-field name">
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={fileChangedHandler} />
          </div>

          {isImageUpload ? (
            <div className="uploaded-image">
              <img src={currentUploadedImage} alt={currentUploadedImage} />
            </div>
          ) : (
            <></>
          )}

          <div className="form-field name">
            <label>Description:</label>
            <textarea
              type="text"
              name="desc"
              value={inputs?.desc || ""}
              onChange={handleChange}
              rows={"5"}
              colums={"7"}
            ></textarea>

            <div className="count">
              {inputs?.desc?.length
                ? inputs?.desc?.length <= properties?.desc.maxLength
                  ? inputs?.desc?.length
                  : properties?.desc.maxLength
                : 0}
              /{properties?.desc.maxLength}
            </div>
          </div>

          {showErrors && errorObj?.desc ? (
            <div className="error">{errorObj?.desc}</div>
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

export default AddHelpContent;
