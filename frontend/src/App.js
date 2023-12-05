import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteHome, RouteAdmin } from "./router";
import LayoutHome from "./container/client";
import { Fragment } from "react";
import LayoutAdmin from "./container/admin";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {" "}
          {RouteHome.map((item, index) => {
            const Page = item.component;
            if (item.layout == "default") {
              return (
                <Route
                  key={index}
                  exact={item.exact}
                  path={item.path}
                  element={
                    <LayoutHome>
                      {" "}
                      <Page />{" "}
                    </LayoutHome>
                  }
                />
              );
            } else {
              return (
                <Route
                  key={index}
                  exact={item.exact}
                  path={item.path}
                  element={
                    <Fragment>
                      {" "}
                      <Page />{" "}
                    </Fragment>
                  }
                />
              );
            }
          })}
        </Routes>
        <Routes>
          {RouteAdmin.map((item, index) => {
            const Page = item.component;
            return (
              <Route
                key={index}
                exact={item.exact}
                path={item.path}
                element={<LayoutAdmin> <Page /> </LayoutAdmin>}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

