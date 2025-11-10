// Gender enum
export const Gender = {
  MALE: "male",
  FEMALE: "female",
};

// Gender utilities
export const getGenderName = (gender, t) => {
  switch (gender) {
    case Gender.MALE:
      return t("maleGender");
    case Gender.FEMALE:
      return t("femaleGender");
    default:
      return null;
  }
};

export const getGenderValue = (gender) => {
  switch (gender) {
    case Gender.MALE:
      return "Male";
    case Gender.FEMALE:
      return "Female";
    default:
      return null;
  }
};

// Language Selection enum
export const LanguageSelection = {
  ENGLISH: "english",
  HINDI: "hindi",
};

export const getLanguageName = (language) => {
  switch (language) {
    case LanguageSelection.ENGLISH:
      return "English";
    case LanguageSelection.HINDI:
      return "Hindi";
    default:
      return null;
  }
};

// User Login Type enum
export const UserLoginType = {
  PEOPLE: "people",
  PROFESSIONAL: "professional",
};

// Dashboard Items enum
export const DashboardItems = {
  HOME: "home",
  DISCOVER: "discover",
  INBOX: "inbox",
  FACILITIES: "facilities",
  PROFILE: "profile",
};

// Profile Status enum
export const ProfileStatus = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
};

// Profile Status Icon component
export const ProfileStatusIcon = ({ type, iconSize = 17 }) => {
  switch (type) {
    case ProfileStatus.VERIFIED:
      return (
        <img
          src="/icons/verify.svg"
          alt="Verified"
          style={{
            height: `${iconSize}px`,
            width: `${iconSize}px`,
            marginLeft: "2px",
          }}
        />
      );
    case ProfileStatus.REJECTED:
      return (
        <img
          src="/icons/reject.svg"
          alt="Rejected"
          style={{
            height: `${iconSize}px`,
            width: `${iconSize}px`,
            marginLeft: "2px",
          }}
        />
      );
    default:
      return null;
  }
};

// Language enum with additional properties
export const Language = {
  ENGLISH: {
    name: "English",
    languageCode: "en",
    countryCode: "US",
    icon: "/icons/english.svg",
  },
  ARABIC: {
    name: "Arabic",
    languageCode: "ar",
    countryCode: "AE",
    icon: "/icons/arabic.svg",
  },
  HINDI: {
    name: "Hindi",
    languageCode: "hi",
    countryCode: "IN",
    icon: "/icons/hindi.svg",
  },
};

export const getLanguageIcon = (type) => {
  switch (type) {
    case "english":
      return Language.ENGLISH.icon;
    case "arabic":
      return Language.ARABIC.icon;
    case "hindi":
      return Language.HINDI.icon;
    default:
      return "";
  }
};

// Social Media Types enum
export const SocialMediaTypes = {
  INSTAGRAM: "instagram",
  YOUTUBE: "youtube",
  TIKTOK: "tiktok",
};
