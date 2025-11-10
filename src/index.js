import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import common_it from "./translations/it/common.json";
import common_en from "./translations/en/common.json";

const lan = localStorage.getItem("language") || "en";
i18next.init({
  fallbackLng: "en",
  interpolation: { escapeValue: false }, // React already does escaping
  lng: lan,
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
    it: {
      common: common_it,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18next}>
    {/* <Provider store={store}> */}
      <BrowserRouter basename={process.env.REACT_APP_HOME_PAGE}>
        <App />
      </BrowserRouter>
    {/* </Provider> */}
  </I18nextProvider>
);

reportWebVitals();
