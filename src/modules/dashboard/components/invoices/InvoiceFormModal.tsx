import React, { useEffect, useState, FC } from "react";
import {
  Button,
  Modal,
  Typography,
  Input,
  Select,
  List,
  InputNumber,
  Divider,
  Tooltip,
  Space,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardSelectors, DashboardModels } from "../../";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { InvoiceActions } from "../../action";
import { formatCurrency } from "../../../../common/utils";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  invoice: DashboardModels.Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}
const InvoiceFormModal: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [totalProductPrice, setTotalProductPrice] = useState(0);

  const { Option } = Select;
  const { Search } = Input;

  const { id } = useParams();

  const invoice = useAppSelector(DashboardSelectors.selectInvoiceDetails);
  const { data } = useAppSelector(DashboardSelectors.selectProducts);

  const prod = data.map((el: any) => {
    return { ...el, quantity: 0 };
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      searchQuery: "",
      productInsertMode: "inside",
      customerName: "",
      products: prod,
      productsOutside: [],
    },
    onSubmit: (values) => {},
  });

  const handleAddProductOutside = () => {
    formik.setFieldValue("productsOutside", [
      ...formik.values.productsOutside,
      { productName: "", productPrice: 0, quantity: 0 },
    ]);
  };

  const handleOk = () => {
    const productSelected = formik.values.products.filter(
      (el: any) => el.quantity !== 0
    );

    const productFinal = productSelected.map((el: any) => {
      return { productId: el.productId, quantity: el.quantity };
    });

    const productOutsideFinal = formik.values.productsOutside.filter(
      (el: any) => el.quantity !== 0
    );

    dispatch(
      InvoiceActions.addInvoice({
        shopId: id,
        data: {
          invoiceCode: "INV0040",
          productInsertMode: formik.values.productInsertMode,
          customerName: formik.values.customerName,
          products:
            formik.values.productInsertMode === "inside"
              ? productFinal
              : productOutsideFinal,
        },
      })
    );
    props.onClose();
  };

  useEffect(() => {
    if (props.invoice?.invoiceId) {
      dispatch(
        InvoiceActions.getInvoiceById({
          shopId: id,
          invoiceId: props.invoice?.invoiceId,
        })
      );
    }
  }, [dispatch, props.invoice?.invoiceId, id]);

  useEffect(() => {
    const totalProductPrice =
      formik.values.productInsertMode === "inside"
        ? formik.values.products
            .map((el: any) => el.productPrice * el.quantity)
            .reduce((a: number, b: number) => a + b, 0)
        : formik.values.productsOutside
            .map((el: any) => el.productPrice * el.quantity)
            .reduce((a: number, b: number) => a + b, 0);

    setTotalProductPrice(totalProductPrice);
  }, [
    formik.values.productInsertMode,
    formik.values.products,
    formik.values.productsOutside,
  ]);

  return (
    <Modal
      style={{ top: 20 }}
      width={800}
      title={invoice ? "Update Invoice" : "Create Invoice"}
      visible={props.isOpen}
      onOk={handleOk}
      onCancel={props.onClose}
      footer={[
        <>
          {totalProductPrice > 0 ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>
                  Total Price :{formatCurrency(totalProductPrice)}
                </Typography>
                <div>
                  {formik.values.customerName ? (
                    <Button type="primary" onClick={handleOk}>
                      Create Invoice
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>,
      ]}
    >
      <form>
        <Input
          style={{ margin: "20px 0" }}
          placeholder="Customer Name"
          name="customerName"
          value={formik.values.customerName}
          onChange={formik.handleChange}
        />
        <Select
          defaultValue="inside"
          style={{ width: "100%" }}
          onChange={(value) => formik.setFieldValue("productInsertMode", value)}
        >
          <Option value="inside">Inside</Option>
          <Option value="outside">Outside</Option>
        </Select>
        <Divider />
        {formik.values.productInsertMode === "inside" ? (
          <>
            <Typography style={{ marginTop: "10px" }}>Products</Typography>

            <div style={{ margin: "10px 0" }}>
              <Search
                onChange={(e) =>
                  formik.setFieldValue("searchQuery", e.target.value)
                }
                // onSearch={}
              />
              {formik.values.searchQuery === "" ? (
                <>
                  <List
                    grid={{ column: 2 }}
                    style={{
                      overflowY: "scroll",
                      height: "300px",
                      marginTop: "20px",
                    }}
                    itemLayout="horizontal"
                    dataSource={formik.values.products}
                    renderItem={(item: any, index) => (
                      <List.Item
                        style={{
                          display: "flex",
                          padding: 10,
                          paddingRight: 20,
                          backgroundColor: "white",

                          margin: 7,
                        }}
                      >
                        <List.Item.Meta
                          title={<Typography>{item.productName}</Typography>}
                          description={
                            <Typography>
                              {formatCurrency(item.productPrice)}
                            </Typography>
                          }
                        />

                        <InputNumber
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const products = formik.values.products.map(
                              (el: any) => {
                                if (el.productId === item.productId) {
                                  return { ...el, quantity: e };
                                }
                                return el;
                              }
                            );

                            formik.setValues({
                              ...formik.values,
                              products,
                            });
                          }}
                        />
                      </List.Item>
                    )}
                  />
                </>
              ) : (
                <>
                  <List
                    grid={{ column: 2 }}
                    style={{
                      overflowY: "scroll",
                      height: "300px",
                      marginTop: "20px",
                    }}
                    itemLayout="horizontal"
                    dataSource={formik.values.products.filter((data: any) =>
                      data.productName.includes(formik.values.searchQuery)
                    )}
                    renderItem={(item: any, index) => (
                      <List.Item
                        style={{
                          display: "flex",
                          paddingRight: 20,
                        }}
                      >
                        <List.Item.Meta
                          title={<Typography>{item.productName}</Typography>}
                          description={
                            <Typography>
                              {formatCurrency(item.productPrice)}
                            </Typography>
                          }
                        />

                        <InputNumber
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const products = formik.values.products.map(
                              (el: any) => {
                                if (el.productId === item.productId) {
                                  return { ...el, quantity: e };
                                }
                                return el;
                              }
                            );

                            formik.setValues({
                              ...formik.values,
                              products,
                            });
                          }}
                        />
                      </List.Item>
                    )}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 10 }}>
              <Tooltip title="add product">
                <Button
                  onClick={handleAddProductOutside}
                  type="primary"
                  icon={<PlusOutlined />}
                >
                  Add product
                </Button>
              </Tooltip>
            </div>
            {formik.values.productsOutside.length > 0 ? (
              <div
                style={{ height: "300px", overflowY: "scroll", padding: 10 }}
              >
                {formik.values.productsOutside.map((product: any, index) => (
                  <>
                    <div
                      style={{
                        display: "flex",
                        margin: "20px 0",
                        justifyContent: "space-between",
                      }}
                    >
                      <Space>
                        <div>
                          <p style={{ marginBottom: 0 }}>Product Name</p>
                          <Input
                            placeholder="Product name"
                            value={product.productName}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `productsOutside.${index}.productName`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <p style={{ marginBottom: 0 }}>Product Price</p>
                          <InputNumber
                            style={{ width: "200px" }}
                            prefix="Rp"
                            placeholder="product price"
                            value={product.productPrice}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `productsOutside.${index}.productPrice`,
                                e
                              )
                            }
                          />
                        </div>
                      </Space>
                      <div>
                        <p style={{ marginBottom: 0 }}>Quantity</p>
                        <InputNumber
                          placeholder="product quantity"
                          value={product.quantity}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `productsOutside.${index}.quantity`,
                              e
                            )
                          }
                        />
                      </div>
                    </div>
                    <Divider />
                  </>
                ))}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </form>
    </Modal>
  );
};

export default InvoiceFormModal;
