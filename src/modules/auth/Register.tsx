import React, { useEffect } from "react";
import {
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Checkbox, Form, Typography, Space } from "antd";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button } from "common/components/custom";
import { useAppDispatch, useAppSelector } from "common/state/hooks";
import { AuthAction, AuthSelectors } from ".";
import { Loader, AlertMessage } from "common/components";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { Title } = Typography;

  const isLoading = useAppSelector(AuthSelectors.selectRequestStatus);
  const register = useAppSelector(AuthSelectors.selectRegisterRoot);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      contactNumber: "",
    },
    onSubmit: (values) => {
      dispatch(AuthAction.registerUser(values));
    },
  });

  useEffect(() => {
    if (register.status === 201) {
      navigate("/login");
      dispatch(AuthAction.clearAuth());
    }
  }, [register.status, navigate, dispatch]);

  return (
    <>
      <AlertMessage message={register.message} error={register.error} />
      <Loader show={isLoading} />
      <div className="auth-form-container">
        <Title level={2}>Welcome!</Title>
        <Form initialValues={{ remember: true }} onFinish={formik.handleSubmit}>
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              type="text"
              value={formik.values.fullName}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full Name"
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            rules={[
              { required: true, message: "Please input your contact number!" },
            ]}
          >
            <Input
              type="number"
              value={formik.values.contactNumber}
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Contact Number"
              onChange={formik.handleChange}
            />
          </Form.Item>
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

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" text="Sign Up" />
              Or <Link to="/login">Sign In</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
