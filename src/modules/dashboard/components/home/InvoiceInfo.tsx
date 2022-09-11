import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../../common/state/hooks";
import { DashboardSelectors } from "../..";
import { Typography, Card, Col, Row } from "antd";
import { formatCurrency } from "../../../../common/utils";

const InvoiceInfo = () => {
  const { data } = useAppSelector(DashboardSelectors.selectInvoices);
  const [totalInvoiceCreated, setTotalInvoiceCreated] = useState(0);

  useEffect(() => {
    const totalPrice = data
      .map((el: any) => el.totalPrice)
      .reduce((acc: number, item: number) => acc + item, 0);

    setTotalInvoiceCreated(totalPrice);
  }, [data]);

  return (
    <Row gutter={12}>
      <Col span={6}>
        <Card style={{ textAlign: "center" }}>
          <Typography.Title level={5}>{data.length}</Typography.Title>
          <Typography>Invoices</Typography>
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ textAlign: "center" }}>
          <Typography.Title level={5}>
            {formatCurrency(totalInvoiceCreated)}
          </Typography.Title>
          <Typography>Total Invoice Price</Typography>
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ textAlign: "center" }}>
          <Typography.Title level={5}>
            {formatCurrency(totalInvoiceCreated)}
          </Typography.Title>
          <Typography>Total Products In Invoices</Typography>
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ textAlign: "center" }}>
          <Typography.Title level={5}>
            {formatCurrency(totalInvoiceCreated)}
          </Typography.Title>
          <Typography>Total Invoice Price</Typography>
        </Card>
      </Col>
    </Row>
  );
};

export default InvoiceInfo;
