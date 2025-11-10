export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API_CONSTANTS = {
  login: `${BASE_URL}/login`,
  register: `${BASE_URL}/register`,
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
  verifyEmail: `${BASE_URL}/verify-email`,
  resendVerificationEmail: `${BASE_URL}/resend-verification-email`,
  logout: `${BASE_URL}/logout`,
};
