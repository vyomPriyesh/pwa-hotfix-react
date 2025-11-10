import React, { useState } from "react";
import { auth, signInWithPopup, OAuthProvider } from "../../firebase";
import { useTranslation } from "react-i18next";
import CommonButton from "./common_button";
import { useNavigate } from "react-router-dom";
import { AppSVG } from "../../common/ImagePath";

const AppleLogin = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const appleLogin = async () => {
    setIsLoading(true);
    const provider = new OAuthProvider("apple.com");

    provider.addScope("email");
    provider.addScope("name");

    try {
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem("token", "token");

      navigate("/");
    } catch (error) {
      console.error("Apple Sign-in Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonButton
      onClick={appleLogin}
      isLoading={isLoading}
      variant="outline"
      className="w-full"
    >
      <div className="flex items-center gap-2">
        <img src={AppSVG.appleIcon} alt="apple" />
        {t("auth.appleLogin")}
      </div>
    </CommonButton>
  );
};

export default AppleLogin;
