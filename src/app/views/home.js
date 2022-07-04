import React from "react";
import { useNavigate } from "react-router-dom";
import { add_ic, view_ic } from "../../assets/images";

import "./home.scss";

const Home = () => {
  const navigateTo = (route) => {
    navigate(route);
  };

  const viewContent = (route) => {
    navigate("/content", {
      state: { type: route },
    });
  };

  let navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="home-component">
        <div className="add faq">
          <div className="text-content">
            {" "}
            FAQ
            <div className="icons">
              <img
                src={add_ic}
                onClick={() => {
                  navigateTo("/faq");
                }}
                alt="view_ic"
              />

              <img
                src={view_ic}
                onClick={() => {
                  viewContent("faq");
                }}
                alt="view_ic"
              />
            </div>
          </div>
        </div>

        <div className="add help">
          <div className="text-content">
            {" "}
            Help Blog{" "}
            <div className="icons">
              <img
                src={add_ic}
                onClick={() => {
                  navigateTo("/help");
                }}
                alt="view_ic"
              />

              <img
                src={view_ic}
                onClick={() => {
                  viewContent("help");
                }}
                alt="view_ic"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
