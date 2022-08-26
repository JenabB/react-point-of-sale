import React, { FC, useState, useRef } from "react";
import { Space, Table, Tag, Button, Input, Popconfirm } from "antd";
import type { InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/lib/table/interface";
import { DashboardActions, DashboardModels } from "../../";
import ProductFormModal from "./ProductFormModal";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { ProductActions } from "../../action";
import Highlighter from "react-highlight-words";

interface Props {
  products: Array<DashboardModels.Product>;
}
interface DataType {
  no: number;
  key: number;
  name: string;
  price: number;
}

type DataIndex = keyof DataType;

const ProductList: FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const dispatch = useAppDispatch();
  const [isOpen, setIOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<DashboardModels.Product | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const data: DataType[] = props.products.map((product, index) => ({
    no: index + 1,
    key: product.productId,
    name: product.productName,
    price: product.productPrice,
  }));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const { id } = useParams();

  const handleAddOpen = () => {
    setSelectedProduct(null);
    setIOpen(true);
  };

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
      ProductActions.deleteProduct({ shopId: id, productId: record.key })
    );
  };

  const handleDeleteCancel = () => {};

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): any => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: any;
      selectedKeys: any;
      confirm: any;
      clearFilters: () => void;
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: any = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Id", dataIndex: "key", key: "key" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
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
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default ProductList;
