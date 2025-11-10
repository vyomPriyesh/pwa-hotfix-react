import React from "react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation("common");

  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-center">
          © {new Date().getFullYear()}. {t("footer.copyright")}
        </p>
      </div>
    </div>
  );
}
