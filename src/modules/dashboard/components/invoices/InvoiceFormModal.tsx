import React, { useEffect, FC } from "react";
import { format } from "fecha";
import {
  Button,
  Modal,
  Typography,
  Input,
  Select,
  List,
  InputNumber,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardActions, DashboardSelectors, DashboardModels } from "../../";
import { useFormik } from "formik";

interface Props {
  invoice: DashboardModels.Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}
const InvoiceFormModal: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const { Option } = Select;
  const { Search } = Input;

  const { shopId } = useAppSelector(DashboardSelectors.selectShop);
  const invoice = useAppSelector(DashboardSelectors.selectInvoiceDetails);
  const products: Array<DashboardModels.Product> = useAppSelector(
    DashboardSelectors.selectProducts
  );

  const prod = products.map((el: any) => {
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

  console.log(formik.values);

  const handleSearch = () => {};

  useEffect(() => {
    if (props.invoice?.invoiceId) {
      dispatch(
        DashboardActions.getInvoiceById({
          shopId,
          invoiceId: props.invoice?.invoiceId,
        })
      );
    }
  }, [dispatch, props.invoice?.invoiceId, shopId]);

  return (
    <Modal
      // style={{max}}
      title={invoice ? "Update Invoice" : "Create Invoice"}
      visible={props.isOpen}
      //   onOk={handleOk}
      onCancel={props.onClose}
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
        {formik.values.productInsertMode === "inside" ? (
          <>
            <div style={{ margin: "20px 0" }}>
              <Search
                onChange={(e) =>
                  formik.setFieldValue("searchQuery", e.target.value)
                }
                // onSearch={}
              />
              {formik.values.searchQuery === "" ? (
                <>
                  <Typography style={{ marginTop: "20px" }}>
                    Products
                  </Typography>
                  <List
                    style={{
                      overflowY: "scroll",
                      height: "300px",
                      marginTop: "20px",
                    }}
                    itemLayout="horizontal"
                    dataSource={formik.values.products}
                    renderItem={(item: any, index) => (
                      <List.Item>
                        <Typography>{item.productName}</Typography>
                        <Typography>{item.productPrice}</Typography>
                        <InputNumber
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `products.${index}.quantity`,
                              e
                            )
                          }
                        />
                      </List.Item>
                    )}
                  />
                </>
              ) : (
                <>
                  <List
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
                      <List.Item>
                        <Typography>{item.productName}</Typography>
                        <Typography>{item.productPrice}</Typography>
                        <InputNumber
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `products.${index}.quantity`,
                              e
                            )
                          }
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
