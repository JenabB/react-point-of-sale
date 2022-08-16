import React, { FC } from "react";
import { Space, Table, Tag, Button } from "antd";
import type { ColumnType } from "antd/lib/table";
import { DashboardModels } from "../../";

interface Props {
  products: Array<DashboardModels.Product>;
}
interface DataType {
  no: number;
  key: number;
  name: string;
  price: number;
}

const ProductList: FC<Props> = (props) => {
  const columns: any = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Id", dataIndex: "key", key: "key" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = props.products.map((product, index) => ({
    no: index + 1,
    key: product.productId,
    name: product.productName,
    price: product.productPrice,
  }));

  //   console.log(columns);
  return (
    <div>
      <Table
        // style={{ minWidth: "1000px" }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default ProductList;
