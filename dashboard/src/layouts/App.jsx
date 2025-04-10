import React, { Fragment, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../common/redux/Store";
import Header from "./layoutcomponents/Header";
import Sidebar from "./layoutcomponents/Sidebar";
import Footer from "./layoutcomponents/Footer";
import Tabtotop from "./layoutcomponents/Tabtotop";

const App = () => {
  const [lateLoad, setlateLoad] = useState(false);

  useEffect(() => {
    setlateLoad(true);
  });

  return (
    <Fragment>
      <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
        <Provider store={store}>
          <HelmetProvider>
            <Helmet
              htmlAttributes={{
                lang: "en",
                dir: "ltr",
                "data-nav-layout": "vertical",
                "data-theme-mode": "light",
                "data-header-styles": "light",
                "data-menu-styles": "light",
                "data-vertical-style": "overlay",
              }}
            >
              <body className=""></body>
            </Helmet>
          </HelmetProvider>
          <div className="page">
            <Header />
            <Sidebar />
            <div className="main-content app-content">
              <div className="container-fluid">
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>
        </Provider>
      </div>
      <Tabtotop />
    </Fragment>
  );
};

export default App;
