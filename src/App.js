import React from "react";

import "./App.scss";

import routes from "./app/config/routing/routes";
import { Header } from "./app/shared/header/header";

import AppRoute from "./app/router/AppRoute";

const App = () => {
  console.log(routes);

  return (
    <div className="main-component">
      <div className="header">
        <Header />
      </div>

      <div className="content">
        <AppRoute routes={routes} />
      </div>
    </div>
  );
};

export default App;
