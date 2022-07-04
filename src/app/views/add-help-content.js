import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./add-help-content.scss";

const AddHelpContent = () => {
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));

    console.log(inputs);
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
        setInputs((values) => ({ ...values, image: res.data.imageUrl }));

        setCurrentUploadedImage(res.data.imageUrl);
        setImageUpload(true);
      })
      .catch((err) => {
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
        navigate("/content", {
          state: {
            type: "help",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createRecord = () => {
    axios
      .post(`${process.env.REACT_APP_API_HOST}/help`, inputs)
      .then((res) => {
        navigate("/content", {
          state: {
            type: "help",
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
  let [isImageUpload, setImageUpload] = useState(false);
  let [inputs, setInputs] = useState({});
  let [file, setFile] = useState(null);
  let [filename, setFilename] = useState("");

  let [currentUploadedImage, setCurrentUploadedImage] = useState(null);
  let recordId = location?.state?.id;

  console.log(recordId);

  useEffect(() => {
    if (recordId) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/help/${recordId}`)
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
        <form onSubmit={submitContent}>
          <div className="form-field name">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={inputs?.title || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-field name">
            <label>SubTitle:</label>
            <input
              type="text"
              name="subtitle"
              value={inputs?.subtitle || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-field name">
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={fileChangedHandler} />
          </div>

          {isImageUpload ? (
            <img src={currentUploadedImage} alt={currentUploadedImage} />
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

export default AddHelpContent;
