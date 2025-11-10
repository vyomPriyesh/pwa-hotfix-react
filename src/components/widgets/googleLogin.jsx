import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { toastError, toastSuccess } from "../../common/toastNotification";
import CommonButton from "./common_button";
import { setLoggedIn } from "../../store/slice/auth";
import { useDispatch } from "react-redux";
import { AppSVG } from "../../common/ImagePath";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info from Google.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const userInfo = await fetchUserInfo(response.access_token);

        dispatch(setLoggedIn(true));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));

        toastSuccess("User login successfully!");
      } catch (error) {
        toastError(error);
      } finally {
        setIsLoading("");
      }
    },
    onError: (error) => toastError(error),
  });

  return (
    <CommonButton
      onClick={googleLogin}
      isLoading={isLoading}
      variant="outline"
      className="w-full"
    >
      <div className="flex items-center gap-2">
        <img src={AppSVG.googleIcon} alt="google" />
        {t("auth.googleLogin")}
      </div>
    </CommonButton>
  );
};

export default GoogleLogin;
