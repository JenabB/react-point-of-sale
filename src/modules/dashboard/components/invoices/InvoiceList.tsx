import React, { FC, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import type { ColumnType } from "antd/lib/table";
import { DashboardModels } from "../../";
import { format } from "fecha";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceFormModal from "./InvoiceFormModal";

interface Props {
  invoices: Array<DashboardModels.Invoice>;
}
interface DataType {
  no: number;
  invoiceId: number;
  invoiceCode: string;
  customerName: string;
  totalPrice: number;
  createdAt: any;
  productInsertMode: string | undefined;
}

const InvoiceList: FC<Props> = (props) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetail, setIsDetail] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const handleDetail = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsDetail(true);
    setIsForm(false);
  };

  const handleForm = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsForm(true);
    setIsDetail(false);
  };

  const handleAdd = () => {
    setSelectedInvoice(null);
    setIsForm(true);
    setIsDetail(false);
  };

  const handleCloseModal = () => {
    setIsDetail(false);
    setIsForm(false);
  };
  const columns: any = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Id", dataIndex: "invoiceId", key: "invoiceId" },
    { title: "Code", dataIndex: "invoiceCode", key: "invoiceCode" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Insert Mode",
      dataIndex: `productInsertMode`,
      key: "productInsertMode",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          <Button type="primary" onClick={() => handleForm(record)}>
            Edit
          </Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = props.invoices.map((invoice, index) => ({
    no: index + 1,
    invoiceId: invoice.invoiceId,
    invoiceCode: invoice.invoiceCode,
    customerName: invoice.customerName,
    totalPrice: invoice.totalPrice,
    createdAt: format(new Date(invoice.createdAt), "D MMM YYYY"),
    productInsertMode: invoice.productInsertMode,
  }));

  return (
    <div>
      <InvoiceDetail
        invoice={selectedInvoice}
        isOpen={isDetail}
        onClose={handleCloseModal}
      />
      <InvoiceFormModal
        invoice={selectedInvoice}
        isOpen={isForm}
        onClose={handleCloseModal}
      />
      <div style={{ textAlign: "right" }}>
        <Button style={{ marginBottom: 20 }} onClick={handleAdd} type="primary">
          Add Invoice
        </Button>
      </div>

      <Table
        // style={{ minWidth: "1000px" }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default InvoiceList;
