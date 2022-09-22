import React, { useState, useEffect } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../common/state/hooks";
import { DashboardSelectors } from "../..";
import { kFormat } from "../../../../common/utils";

const ProductInfo = () => {
  const { data } = useAppSelector(DashboardSelectors.selectProducts);
  const [totalProductPrice, setTotalProductPrice] = useState(0);

  useEffect(() => {
    const totalPrice = data
      .map((el: any) => el.productPrice)
      .reduce((acc: number, item: number) => acc + item, 0);

    setTotalProductPrice(totalPrice);
  }, [data]);

  return (
    <Row gutter={12}>
      <Col span={6}>
        <Card style={{ textAlign: "center" }}>
          <Statistic
            title="Products"
            value={data.length}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card style={{ textAlign: "center" }}>
          <Statistic
            title="Total Product Price"
            value={kFormat(totalProductPrice, 2)}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ textAlign: "center" }}>
          <Statistic title="Products" value={data.length} />
        </Card>
      </Col>
    </Row>
  );
};

export default ProductInfo;
