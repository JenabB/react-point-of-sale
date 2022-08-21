import { Button, Modal, Form, Input, Select, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../common/state/hooks";
import { ShopActions, ShopSelectors, ShopModels } from "../";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ShopCreateModal: React.FC<Props> = (props) => {
  const [payload, setPayload] = useState(null);
  const dispatch = useAppDispatch();

  const { TextArea } = Input;

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

  const handleOk = () => {
    dispatch(ShopActions.saveShop({ data: formik.values }));
    props.onClose();
  };

  // if (isLoading) return <Loader show={true} />;

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
          <Row>
            <Col span={8}>
              <Form.Item>
                <Select onChange={(e) => formik.setFieldValue("countryId", e)}>
                  {countries.map((country, index) => (
                    <Option key={index} value={country.countryId}>
                      {country.niceName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              {formik.values.countryId !== 0 && provinces ? (
                <Form.Item>
                  <Select
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
            </Col>

            <Col span={8}>
              {formik.values.provinceId !== 0 && regencies ? (
                <Form.Item>
                  <Select
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
            </Col>
          </Row>
          <Form.Item
            name="contactNumber"
            rules={[
              { required: true, message: "Please input your contact number" },
            ]}
          >
            <Input
              placeholder="Contact Number"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please input your address" }]}
          >
            <TextArea
              rows={3}
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ShopCreateModal;
