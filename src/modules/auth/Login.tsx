import React, { useEffect } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { Checkbox, Form, Typography, Space, Layout } from "antd";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "common/state/hooks";
import { AuthAction, AuthSelectors } from ".";
import { Loader, AlertMessage } from "common/components";
import { ShopActions } from "modules/shop";
import { Input, Button } from "common/components/custom";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { Title } = Typography;

  const { Content } = Layout;

  const isLoading = useAppSelector(AuthSelectors.selectRequestStatus);
  const login = useAppSelector(AuthSelectors.selectLoginRoot);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(AuthAction.loginUser(values));
    },
  });

  const token = sessionStorage.getItem("pos-token");

  useEffect(() => {
    if (login.status === 200 && token !== null) {
      dispatch(ShopActions.getOwnerShops());
      navigate("/shop");
      dispatch(AuthAction.clearAuth());
    }
  }, [login.status, token, navigate, dispatch]);

  return (
    <>
      <AlertMessage error={login.error} />
      <Loader show={isLoading} />
      <Content className="auth-form-container">
        <Title level={2}>Welcome Back!</Title>
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
              placeholder="Password"
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" text="Sign In" />
              {/* <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign In
              </Button> */}
              Or <Link to="/register">Sign Up</Link>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};

export default Register;
