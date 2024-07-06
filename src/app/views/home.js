import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { add_ic, view_ic } from "../../assets/images";

import "./home.scss";
import AddSectionForm from "./add-section";

const Home = () =>
{
  let navigate = useNavigate();
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);

  const navigateTo = (route) => {
    navigate(route);
  };

  const viewContent = (route) => {
    navigate("/content", {
      state: { type: route },
    });
  };

  const addSection = () =>
  { 
    toggle();
  }

  const toggle = () =>
  { 
    setShowAddSectionForm(!showAddSectionForm);
  }

  return (
    <React.Fragment>
      <div className="home-component">
        <div className="add faq">
          <div className="text-content">
            {" "}
            Q-section
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
            PRI Section{" "}
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

        <div className="add-section-cta">
          <button onClick={()=> addSection()}>Add section</button>
        </div>         
      
        {showAddSectionForm && <AddSectionForm close={ toggle } />}
      
      </div>
    </React.Fragment>
  );
};

export default Home;
