import { Alert } from "antd";
import React from "react";

interface Props {
  message?: string;
  error: boolean;
}
const AlertMessage: React.FC<Props> = (props) => (
  <>
    {props.message ? (
      <Alert message={props.message} type={props.error ? "error" : "success"} />
    ) : (
      ""
    )}
  </>
);

export default AlertMessage;
