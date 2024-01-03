import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAccount, updateAccount } from "../redux/actions/accountAction";
import { setError } from "../redux/actions/commonAction";
import withRouter from "../helpers/withRouter";

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

function EditAccount() {
  const [form] = Form.useForm();
  const yourDefaultValue = 3;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedUserSession = sessionStorage.getItem("userSession");
  const userSession = storedUserSession ? JSON.parse(storedUserSession) : null;
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
      id: userSession.data.id,
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
    console.log("Received values of formdata: ", data);
    dispatch(updateAccount(userSession.data.id, data, navigate));
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
          initialValue={userSession ? userSession.data.username : undefined}
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
          <Input readOnly />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          tooltip="Hãy nhập mật khẩu dễ nhớ"
          initialValue={userSession ? userSession.data.password : undefined}
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
          initialValue={userSession ? userSession.data.password : undefined}
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
          initialValue={userSession ? userSession.data.fullname : undefined}
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
          initialValue={userSession ? userSession.data.date : undefined}
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
          initialValue={userSession ? userSession.data.adress : undefined}
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
          initialValue={userSession ? userSession.data.phone_number : undefined}
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditAccount;
