export const AppConstants = {
  emailPatternRegExp: `^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`,
  fullNamePatternRegExp: `/^[a-zA-Z0-9 ]+$/`,
  phoneNumberPatternRegExp: `/[^0-9]/`,
  passwordPatternRegExp: `/^.*(?=.{8,255})((?=.*[!@#$%^&*_,]))(?=.*\d)((?=.*[A-Z]))((?=.*[a-z])).*$/`,
  nameExcludeCharsRegExp: `/[0-9,.!@#$%^&*()\n]`,
  trackingNumberRegExp: `/[A-Za-z0-9]*/`,
  extraNumberRegExp: `/[^0-9]/`,
  userNamePatternRegExp: `/[a-zA-Z]/`,

  // Pagination
  pageSize: 20,

  // Date Formats
  kycFrontDateOFBirthFormat: "MM/dd/yyyy",
  licenseDateFormat: "dd/MM/yyyy",
  serverDateFormat: "yyyy-MM-dd",
  serverTimeFormat: "HH:mm:ss",
  localDateFormat: "MMM dd, yyyy",
  localTimeFormat: "hh:mm a",
  serverDateTimeFormat: "yyyy-MM-dd HH:mm:ss",
  localDateTimeFormat: "MMM dd, yyyy hh:mm a",
};
