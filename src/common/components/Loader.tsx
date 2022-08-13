import { Spin } from "antd";
import React from "react";

interface Props {
  show?: boolean;
}
const Loader: React.FC<Props> = (props) => {
  return (
    <>
      {props.show ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        >
          <Spin size="large" />{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Loader;
