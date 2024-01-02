import "./DashboardPage.css";
import {
  UserOutlined,
} from "@ant-design/icons";
import { AutoComplete, Avatar, Col, Layout, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setMessage } from "../redux/actions/commonAction";
import { LOG_OUT } from "../redux/actions/actionTypes";
import UserClass from "../components/user/userclass";
import UserSubject from "../components/user/usersubject";
import UserLesson from "../components/user/userlesson";
import UserLessonDetails from "../components/user/userlessondetals";
import Quiz from "../components/user/Quiz";
const { Header, Content } = Layout;

function User() {
  const handleLogout = () => {
    let sesion = sessionStorage.removeItem("userSession");

    if (!sesion) {
      navigate("/login");
      dispatch({ type: LOG_OUT });
    }
  };
  const handleDetailAccount = () => {
    navigate("/dashboard/account/account_details");
  };

  const navigate = useNavigate();

  const msg = useSelector((state) => state.commonReducer.message);
  const err = useSelector((state) => state.commonReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (msg) {
      dispatch(setMessage(""));
      message.success(msg);
    }

    if (err) {
      dispatch(setError(""));
      message.success(err);
    }
    let sesion = sessionStorage.getItem("userSession");
    if (!sesion) {
      navigate("/login");
    }
  }, [msg, err]);

  const storedUserSession = sessionStorage.getItem("userSession");
  const userSession = storedUserSession ? JSON.parse(storedUserSession) : null;

  return (
    <Layout>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            right: 16,
            left: 16,
            top: 0,
            position: "fixed",
            height: 70,
          }}
        >
          <Row>
            <Col md={4}>
              <div>Trang chủ</div>
            </Col>
            <Col md={4}>
              <div>Giới thiệu</div>
            </Col>
            <Col md={4}>
              <div>Liên hệ</div>
            </Col>
            <Col
              md={12}
              onClick={handleDetailAccount}
              style={{ position: "absolute", top: 0, right: 5 }}
            >
              <div>
                <Avatar size="default" icon={<UserOutlined />}></Avatar>
                {userSession ? userSession.data.fullname : "Null"}
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "80px 24px 16px 24px",
            padding: 24,
          }}
        >
          <div className="content-panel" style={{ overflowY: "auto" }}>
            <Routes>
              <Route path="/*" element={<UserClass />}></Route>
              <Route path="/subject/:id" element={<UserSubject />}></Route>
              <Route path="/lesson/:id" element={<UserLesson />}></Route>
              <Route path="/lessondetails/:id" element={<UserLessonDetails />}></Route>
              <Route path="/quiz/:id" element={<Quiz />}></Route>
            </Routes>
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default User;
