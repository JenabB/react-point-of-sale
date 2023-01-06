import React, { FC } from "react";
import { Input as AntdInput } from "antd";

interface Props {
  value: any;
  type: string;
  placeholder: string;
  prefix?: any;
  onChange: any;
}

const Input: FC<Props> = (props) => {
  return (
    <AntdInput
      style={{ padding: "15px 20px", borderRadius: 30 }}
      value={props.value}
      prefix={props.prefix}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};

export default Input;
