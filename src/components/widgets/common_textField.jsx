import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff, Search, Filter } from "lucide-react";
import { cn } from "../../lib/utils";

const CommonTextField = ({
  label,
  placeholder,
  type = "text",
  isPassword,
  prefixIcon,
  suffixIcon,
  disabled,
  className,
  onChange,
  value,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClasses = cn(
    "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const renderIcon = () => {
    if (isPassword) {
      return (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          {showPassword ? (
            <Eye className="h-4 w-4 text-gray-500" />
          ) : (
            <EyeOff className="h-4 w-4 text-gray-500" />
          )}
        </button>
      );
    }
    return suffixIcon;
  };

  const input = (
    <div className="relative">
      {prefixIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {prefixIcon}
        </div>
      )}
      <Input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        value={value}
        autoComplete="new-password"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className={cn(
          inputClasses,
          prefixIcon && "pl-10",
          (renderIcon() || suffixIcon) && "pr-10"
        )}
        {...props}
      />
      {(renderIcon() || suffixIcon) && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {renderIcon() || suffixIcon}
        </div>
      )}
    </div>
  );

  if (label) {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium text-primary">{label}</Label>
        {input}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  return input;
};

// Simplified Search Field
const CommonSearchField = ({
  placeholder = "Search...",
  onChange,
  onFilter,
  showFilter = true,
  className,
  ...props
}) => {
  return (
    <CommonTextField
      placeholder={placeholder}
      onChange={onChange}
      className={cn("h-[52px] bg-gray-100", className)}
      prefixIcon={<Search className="h-5 w-5 text-gray-500" />}
      suffixIcon={
        showFilter && (
          <button
            type="button"
            onClick={onFilter}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Filter className="h-5 w-5 text-gray-500" />
          </button>
        )
      }
      {...props}
    />
  );
};

export { CommonTextField, CommonSearchField };
