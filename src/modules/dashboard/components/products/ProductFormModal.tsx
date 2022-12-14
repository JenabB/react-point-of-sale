import React from "react";
import { Modal, Input, InputNumber } from "antd";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../../common/state/hooks";
import { useParams } from "react-router-dom";
import { ProductActions } from "../../action";

interface Props {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProductFormModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: props.product?.name || "",
      productPrice: props.product?.price || "",
    },
    onSubmit: (values) => {},
  });

  const handleOk = () => {
    props.product
      ? dispatch(
          ProductActions.saveProduct({
            shopId: id,
            productId: props.product.key,
            data: formik.values,
          })
        )
      : dispatch(
          ProductActions.saveProduct({
            shopId: id,
            data: formik.values,
          })
        );
    formik.resetForm();
    props.onClose();
  };

  return (
    <Modal
      title="Product"
      visible={props.isOpen}
      onOk={handleOk}
      onCancel={props.onClose}
      okButtonProps={{ disabled: Boolean(formik.values.productPrice < 0) }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Input
          style={{ margin: "20px 0" }}
          placeholder="Product name"
          name="productName"
          value={formik.values.productName}
          onChange={formik.handleChange}
        />
        <InputNumber
          prefix="Rp"
          type="number"
          style={{ width: "100%" }}
          placeholder="Product price"
          name="productPrice"
          value={formik.values.productPrice}
          onChange={(e) => {
            formik.setFieldValue("productPrice", e);
          }}
        />
      </form>
    </Modal>
  );
};

export default ProductFormModal;
