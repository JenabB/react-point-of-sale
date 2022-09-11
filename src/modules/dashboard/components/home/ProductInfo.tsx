import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../../common/state/hooks";
import { DashboardSelectors } from "../..";
import { Typography, Card, Col, Row } from "antd";
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
          <Typography.Title level={5}>{data.length}</Typography.Title>
          <Typography>Products</Typography>
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ textAlign: "center" }}>
          <Typography.Title level={5}>
            {formatCurrency(totalProductPrice)}
          </Typography.Title>
          <Typography>Total Product Price</Typography>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Typography>{formatCurrency(totalInvoiceCreated)}</Typography>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Typography>{formatCurrency(totalInvoiceCreated)}</Typography>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductInfo;
