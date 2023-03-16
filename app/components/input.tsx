import React from "react";
import { motion } from "framer-motion";
interface IInputProps {
  type: string;
  name: string;
  value: string | number;
  disabled?: boolean;
  errorMsg?: string;
  success?: boolean;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
export default function Input({
  type,
  name,
  value,
  disabled,
  onChange,
  placeholder = "",
  errorMsg = "",
  success = false,
}: IInputProps) {
  return (
    <>
      <input
        autoComplete="off"
        placeholder={placeholder}
        className={
          Boolean(`${value}`?.length)
            ? errorMsg
              ? "error"
              : success
              ? "success"
              : ""
            : ""
        }
        disabled={disabled}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errorMsg && Boolean(`${value}`?.length) ? (
        <span className="error-msg">{errorMsg}</span>
      ) : null}
    </>
  );
}
