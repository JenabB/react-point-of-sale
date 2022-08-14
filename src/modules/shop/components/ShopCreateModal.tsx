import { Button, Modal, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../common/state/hooks";
import { ShopActions, ShopSelectors, ShopModels } from "../";
import { Loader } from "../../../common/components";
import { tuple } from "antd/es/_util/type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ShopCreateModal: React.FC<Props> = (props) => {
  const [payload, setPayload] = useState(null);
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(ShopSelectors.selectRequestStatus);
  const countries: Array<ShopModels.Country> = useAppSelector(
    ShopSelectors.selectCountries
  );
  const provinces: Array<ShopModels.Province> = useAppSelector(
    ShopSelectors.selectProvinces
  );
  const regencies: Array<ShopModels.Regency> = useAppSelector(
    ShopSelectors.selectRegencies
  );

  const { Option } = Select;

  const formik = useFormik({
    initialValues: {
      shopName: "",
      countryId: 0,
      provinceId: 0,
      regencyId: 0,
      address: "",
      contactNumber: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (formik.values.countryId !== 0) {
      dispatch(ShopActions.getProvinces(formik.values.countryId));
    }
  }, [dispatch, formik.values.countryId]);

  useEffect(() => {
    if (formik.values.provinceId !== 0) {
      dispatch(ShopActions.getRegencies(formik.values.provinceId));
    }
  }, [dispatch, formik.values.provinceId]);

  const handleOk = () => {};

  console.log(formik.values);

  if (isLoading) return <Loader show={true} />;

  return (
    <>
      <Modal
        title="Create Shop"
        visible={props.isOpen}
        onOk={handleOk}
        onCancel={props.onClose}
      >
        <Form initialValues={{ remember: true }} onFinish={formik.handleSubmit}>
          <Form.Item
            name="shopName"
            rules={[
              { required: true, message: "Please input your shop name!" },
            ]}
          >
            <Input
              placeholder="Shop name"
              name="shopName"
              value={formik.values.shopName}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Select
              style={{ width: "33.33%" }}
              onChange={(e) => formik.setFieldValue("countryId", e)}
            >
              {countries.map((country, index) => (
                <Option key={index} value={country.countryId}>
                  {country.niceName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {formik.values.countryId !== 0 && !isLoading ? (
            <Form.Item>
              <Select
                style={{ width: "33.33%" }}
                onChange={(e) => formik.setFieldValue("provinceId", e)}
              >
                {provinces.map((provincy, index) => (
                  <Option key={index} value={provincy.provinceId}>
                    {provincy.provinceName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            ""
          )}

          {formik.values.provinceId !== 0 && !isLoading ? (
            <Form.Item>
              <Select
                style={{ width: "33.33%" }}
                onChange={(e) => formik.setFieldValue("regencyId", e)}
              >
                {regencies.map((regency, index) => (
                  <Option key={index} value={regency.regencyId}>
                    {regency.regencyName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            ""
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ShopCreateModal;
