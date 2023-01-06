import { Button, Modal, Space, Input, Select, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "common/state/hooks";
import { ShopActions, ShopSelectors, ShopModels } from "modules/shop";
import Shop from "../Shop";

interface Props {
  isOpen: boolean;
  shop?: any;
  onClose: () => void;
}

const ShopCreateModal: React.FC<Props> = (props) => {
  const [payload, setPayload] = useState(null);
  const dispatch = useAppDispatch();

  const { TextArea } = Input;

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
    enableReinitialize: true,
    initialValues: {
      shopName: props.shop?.shopName || "",
      countryId: props.shop?.countryId || 0,
      provinceId: props.shop?.provinceId || 0,
      regencyId: props.shop?.regencyId || 0,
      address: props.shop?.address || "",
      contactNumber: props.shop?.contactNumber || "",
    },
    onSubmit: (values) => {},
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
    props.shop
      ? dispatch(
          ShopActions.saveShop({
            shopId: props.shop.shopId,
            data: formik.values,
          })
        )
      : dispatch(
          ShopActions.saveShop({
            data: formik.values,
          })
        );
    props.onClose();
  };

  // if (isLoading) return <Loader show={true} />;

  return (
    <>
      <Modal
        title={props.shop ? "Edit Shop Information" : "Create Shop"}
        visible={props.isOpen}
        onOk={handleOk}
        onCancel={props.onClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <div style={{ margin: "20px 0" }}>
            <Input
              placeholder="Shop name"
              name="shopName"
              value={formik.values.shopName}
              onChange={formik.handleChange}
            />
          </div>
          <Row style={{ margin: "20px 0" }}>
            <Col span={8}>
              <div style={{ margin: "0px 5px" }}>
                <Select
                  defaultValue={formik.values.countryId}
                  style={{ width: "100%" }}
                  onChange={(e) => formik.setFieldValue("countryId", e)}
                >
                  {countries.map((country, index) => (
                    <Option key={index} value={country.countryId}>
                      {country.niceName}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col span={8}>
              {formik.values.countryId !== 0 && provinces ? (
                <div>
                  <Select
                    defaultValue={formik.values.provinceId}
                    style={{ width: "100%" }}
                    onChange={(e) => formik.setFieldValue("provinceId", e)}
                  >
                    {provinces.map((provincy, index) => (
                      <Option key={index} value={provincy.provinceId}>
                        {provincy.provinceName}
                      </Option>
                    ))}
                  </Select>
                </div>
              ) : (
                ""
              )}
            </Col>

            <Col span={8}>
              {formik.values.provinceId !== 0 && regencies ? (
                <div style={{ margin: "0px 5px" }}>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={formik.values.regencyId}
                    onChange={(e) => formik.setFieldValue("regencyId", e)}
                  >
                    {regencies.map((regency, index) => (
                      <Option key={index} value={regency.regencyId}>
                        {regency.regencyName}
                      </Option>
                    ))}
                  </Select>
                </div>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <div style={{ margin: "20px 0" }}>
            <Input
              placeholder="Contact Number"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <TextArea
              rows={3}
              name="address"
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ShopCreateModal;
