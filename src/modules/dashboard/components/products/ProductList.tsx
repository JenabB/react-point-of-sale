import React, { FC, useState } from "react";
import { Space, Table, Tag, Button, Modal, Popconfirm } from "antd";
import { DashboardActions, DashboardModels } from "../../";
import ProductFormModal from "./ProductFormModal";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";

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
  const dispatch = useAppDispatch();
  const [isOpen, setIOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<DashboardModels.Product | null>(null);

  const { id } = useParams();

  const handleAddOpen = () => setIOpen(true);

  const handleEditOpen = (product: DashboardModels.Product) => {
    setSelectedProduct(product);
    setIOpen(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setIOpen(false);
  };

  const handleDeleteConfirm = (record: any) => {
    dispatch(
      DashboardActions.deleteProduct({ shopId: id, productId: record.key })
    );
  };

  const handleDeleteCancel = () => {};

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
          <Button type="primary" onClick={() => handleEditOpen(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDeleteConfirm(record)}
            onCancel={handleDeleteCancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
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
      <ProductFormModal
        product={selectedProduct}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <div style={{ textAlign: "right" }}>
        <Button
          style={{ marginBottom: 20 }}
          onClick={handleAddOpen}
          type="primary"
        >
          Add Product
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

export default ProductList;
