import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { Button, Alert, Form, Input, Typography, Space, Layout } from "antd";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "common/state/hooks";
// import { AuthAction, AuthSelectors } from ".";
import { Loader, AlertMessage } from "common/components";
import { UserActions } from "modules/dashboard/action";
import { DashboardSelectors } from "modules/dashboard";

const ChangeUserInformation = () => {
  const [isError, setIsError] = useState(false);

  const { data } = useAppSelector(DashboardSelectors.selectUserRoot);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { Title } = Typography;
  const { TextArea } = Input;

  const { Content } = Layout;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: data.fullName || "",
      contactNumber: data.contactNumber || "",
      address: data.address || "",
    },
    onSubmit: (values) => {
      dispatch(UserActions.changeUserInformation(values));
      navigate(-1);
    },
  });

  console.log(formik.values);

  //   useEffect(() => {
  //     if (login.status === 200 && sessionStorage.getItem("pos-token")) {
  //       navigate("/shop");
  //     }
  //   }, [login.status]);

  return (
    <>
      {/* <AlertMessage error={login.error} /> */}
      {/* <Loader show={isLoading} /> */}
      <Content className="auth-form-container">
        <Title level={5}>Change User Information</Title>
        <Form initialValues={{ remember: true }} onFinish={formik.handleSubmit}>
          <div style={{ margin: "20px 0" }}>
            <Input
              name="fullName"
              type="text"
              value={formik.values.fullName}
              placeholder="Full Name"
              onChange={formik.handleChange}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <Input
              value={formik.values.contactNumber}
              type="text"
              placeholder="Contact Number"
              onChange={formik.handleChange}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <TextArea
              name="address"
              value={formik.values.address}
              rows={4}
              onChange={formik.handleChange}
            />
          </div>

          <Form.Item>
            <Space>
              <Button
                onClick={() => navigate(-1)}
                className="login-form-button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Change Information
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Content>
      {isError && (
        <Alert message="Error Text" type="error" closable onClose={() => {}} />
      )}
    </>
  );
};

export default ChangeUserInformation;
