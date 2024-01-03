import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import "./LoginPage.css";
import logo from "../Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "../redux/actions/accountAction";
import { Navigate, useNavigate } from "react-router-dom"; // Import Navigate instead of Redirect
import { setError, setMessage } from "../redux/actions/commonAction";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 // const isLoggedIn = useSelector((state) => state.accountReducer.isLoggedIn);
  const err = useSelector((state) => state.commonReducer.error);
  const msg = useSelector((state) => state.commonReducer.message);
  useEffect(() => {
    if (msg) {
      dispatch(setMessage(""));
      message.success(msg);
    }
    if (err) {
      dispatch(setError(""));
      message.success(err);
    }
  }, [msg, err]);
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(loginAccount(values,navigate));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to the registration page
  };

  // if (isLoggedIn) {
   
  //   return <Navigate to="/dashboard/*" />; // Use Navigate to redirect
  // }

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[
            {
              required: true,
              message: "Hãy nhập tên đăng nhập!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          className="button-container"
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          <Button type="default" onClick={handleRegisterClick}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
