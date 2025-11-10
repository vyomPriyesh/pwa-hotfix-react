import { useTranslation } from "react-i18next";
import "./App.css";
import Router from "./router/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "en");
    } else {
      i18n.changeLanguage(localStorage.getItem("language"));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
