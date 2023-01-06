import React from "react";
import { Button as AntdButton } from "antd";

interface Props {
  type: any;
  htmlType?: any;
  text: string;
}

const style = {
  borderRadius: 20,
  paddingRight: 20,
  paddingLeft: 20,
};

const Button: React.FC<Props> = (props) => {
  return (
    <AntdButton type={props.type} htmlType={props.htmlType} style={style}>
      {props.text}
    </AntdButton>
  );
};

export default Button;
