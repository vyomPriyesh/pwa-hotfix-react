import { useTranslation } from "react-i18next";
import "./App.css";
import Router from "./router/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDropdown } from "./store/slice/dropdown";

function App() {

  const { t, i18n } = useTranslation("common");
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllDropdown())
  }, [dispatch])


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
