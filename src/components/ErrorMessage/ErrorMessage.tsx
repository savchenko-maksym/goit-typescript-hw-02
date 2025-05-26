import React from "react";
import s from "./ErrorMessage.module.css";

const ErrorMessage: React.FC = () => {
  return <p className={s.errorMessage}>SERVER ERROR</p>;
};

export default ErrorMessage;
