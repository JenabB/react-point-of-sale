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
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardActions, DashboardSelectors, DashboardModels } from "../../";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { InvoiceActions } from "../../action";
import { formatCurrency } from "../../../../common/utils";

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
  console.log(id);
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
    },
    onSubmit: (values) => {},
  });

  console.log(formik.values, "values");

  const handleSearch = () => {};

  const handleOk = () => {
    const productSelected = formik.values.products.filter(
      (el: any) => el.quantity !== 0
    );

    const productFinal = productSelected.map((el: any) => {
      return { productId: el.productId, quantity: el.quantity };
      // const { productId, quantity } = el;

      // const product = { productId, quantity };

      // return product;
    });

    dispatch(
      InvoiceActions.addInvoice({
        shopId: id,
        data: {
          invoiceCode: "INV0040",
          productInsertMode: formik.values.productInsertMode,
          customerName: formik.values.customerName,
          products: productFinal,
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
    const totalProductPrice = formik.values.products
      .map((el: any) => el.productPrice * el.quantity)
      .reduce((a: number, b: number) => a + b, 0);

    setTotalProductPrice(totalProductPrice);
  }, [formik.values.products]);

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
          <></>
        )}
      </form>
    </Modal>
  );
};

export default InvoiceFormModal;
