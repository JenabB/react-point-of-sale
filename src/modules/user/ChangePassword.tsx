import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { Button, Alert, Form, Input, Typography, Space, Layout } from "antd";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../common/state/hooks";
// import { AuthAction, AuthSelectors } from ".";
import { Loader, AlertMessage } from "../../common/components";

const ChangePassword = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { Title } = Typography;

  const { Content } = Layout;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      newPassword: "",
    },
    onSubmit: (values) => {
      //   dispatch(AuthAction.loginUser(values));
    },
  });

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
        <Title level={5}>Change User Password</Title>
        <Form initialValues={{ remember: true }} onFinish={formik.handleSubmit}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="email"
              value={formik.values.email}
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              value={formik.values.password}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              autoComplete="off"
              placeholder="Password"
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new Password!" },
            ]}
          >
            <Input
              value={formik.values.newPassword}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              defaultValue=""
              placeholder="New Password"
              onChange={formik.handleChange}
            />
          </Form.Item>

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
                Change Password
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

export default ChangePassword;
