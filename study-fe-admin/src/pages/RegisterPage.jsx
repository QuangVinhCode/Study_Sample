import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from "antd";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { insertAccount } from "../redux/actions/accountAction";
import { setError } from "../redux/actions/commonAction";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function RegisterPage() {
  const [form] = Form.useForm();
  const yourDefaultValue = 3;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const err = useSelector((state) => state.commonReducer.error);
  useEffect(() => {
    if (err) {
      dispatch(setError(""));
      message.success(err);
    }
  }, [err]);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const data = {
      username: values.username,
      password: values.password,
      fullname: values.fullname,
      date: values.date,
      adress: values.adress,
      phone_number: values.phone_number,
      role: {
        id: values.role_id,
      },
    };
    dispatch(insertAccount(data,navigate));
  };
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the registration page
  };
  return (
    <div className="center-container">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập",
            },
            {
              min: 4,
              message: "Tên đăng nhập cần ít nhất 4 ký tự",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          tooltip="Hãy nhập mật khẩu dễ nhớ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              min: 4,
              message: "Mật khẩu cần ít nhất 4 ký tự",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu!",
            },
            {
              min: 4,
              message: "Mật khẩu cần ít nhất 4 ký tự",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu nhập lại của bạn nhập không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="fullname"
          label="Họ và tên"
          tooltip="Hãy nhập họ và tên"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ và tên",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="Tuổi"
          rules={[
            {
              type: "number",
              message: "Vui lòng nhập số",
            },
            {
              type: "number",
              min: 0,
              message: "Tuổi phải lớn hơn 0",
            },
            {
              required: true,
              message: "Vui lòng nhập tuổi",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="adress"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role_id"
          style={{ display: "none" }}
          initialValue={yourDefaultValue}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item {...tailFormItemLayout} className="button-container">
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
          <Button type="default" onClick={handleLoginClick}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterPage;
