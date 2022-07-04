import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./App.scss";

export default function AppRoute({ routes }) {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          {routes.map((route) => (
            <React.Fragment>
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            </React.Fragment>
          ))}
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}
