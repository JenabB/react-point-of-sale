import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../../common/state/hooks";
import { DashboardSelectors } from "../..";
import { Typography, Card, Col, Row, Statistic } from "antd";
import { formatCurrency } from "../../../../common/utils";

const ProductInfo = () => {
  const { data } = useAppSelector(DashboardSelectors.selectProducts);
  const [totalInvoiceCreated, setTotalInvoiceCreated] = useState(0);
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
          <Statistic title="Products" value={data.length} />
        </Card>
      </Col>
      <Col span={12}>
        <Card style={{ textAlign: "center" }}>
          <Statistic
            title="Total Product Price"
            value={formatCurrency(totalProductPrice)}
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
