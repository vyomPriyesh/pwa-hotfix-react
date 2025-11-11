import React from "react";
import { useNavigate } from "react-router";
import Toaster from "../../components/common/toaster";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toastSuccess } from "../../common/toastNotification";
import { useTranslation } from "react-i18next";
import { CommonTextField } from "../../components/widgets/common_textField";
import CommonButton from "../../components/widgets/common_button";
import { AppImages } from "../../common/ImagePath";
import { login, setLoggedIn } from "../../store/slice/auth";

const Login = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    mobile: "",
    password: "",
  };

  const validationSchema = Yup.object({
    mobile: Yup.string().required(t("messages.emailRequired")),
    password: Yup.string()
      .min(8, t("messages.password"))
      .matches(/[A-Z]/, t("messages.passwordUppercase"))
      .matches(/[a-z]/, t("messages.passwordLowercase"))
      .matches(/[0-9]/, t("messages.passwordNumber"))
      .matches(/[!@#$%^&*_,]/, t("messages.passwordSpecialChar"))
      .required(t("messages.passwordRequired")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("login api");

    try {

      const response = await dispatch(login(values)).unwrap()
      if(response){
        localStorage.setItem("isLoggedIn", "true");
        dispatch(setLoggedIn(true))
        toastSuccess(t("messages.loginSuccess"));
        navigate("/");
      }
    } catch (error) {
      Toaster(
        "error",
        error?.response?.error?.error_message || t("messages.somethingWentWrong")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="max-w-3xl w-full px-5">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full border-input border h-fit rounded-md shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <a href="/" className="flex items-center gap-2 justify-center">
              <div className="w-20 lg:w-48">
                <img
                  src={AppImages.logoIconDark}
                  alt="logo"
                  className="block dark:hidden w-full"
                />
                <img
                  src={AppImages.logoIcon}
                  alt="logoDark"
                  className="hidden dark:block w-full"
                />
              </div>
            </a>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white text-gray-900">
              {t("auth.signIn")}
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="mt-10 space-y-6" onSubmit={formik.handleSubmit}>
              <div className="grid gap-1.5">
                <CommonTextField
                  label={t("email")}
                  type="number"
                  name="mobile"
                  placeholder={t("emailPlaceholder")}
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.mobile && formik.errors.mobile}
                />
              </div>

              <div className="grid gap-1.5">
                <CommonTextField
                  label={t("password")}
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t("passwordPlaceholder")}
                  isPassword
                  error={formik.touched.password && formik.errors.password}
                />
              </div>

              <CommonButton
                type="submit"
                className="w-full"
                isLoading={formik.isSubmitting}
              >
                {t("auth.signIn")}
              </CommonButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
