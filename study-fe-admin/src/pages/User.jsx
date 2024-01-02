import "./DashboardPage.css";
import { UserOutlined } from "@ant-design/icons";
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
import AccountDetails from "../components/user/AccountDetails";
import EditAccount from "../components/user/EditAccount";
import Introdution from "../components/user/Introdution";
import Contact from "../components/user/Contact";
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
    navigate("/user/account/account_details");
  };
  const onHome = () => {
    navigate("/user/*");
  };
  const onIntroduction = () => {
    navigate("/user/introdution");
  };
  const onContact = () => {
    navigate("/user/contact");
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
            <Col md={2} style={{ marginLeft: 5 }} onClick={onHome}>
              <div>Trang chủ</div>
            </Col>
            <Col md={2} onClick={onIntroduction}>
              <div>Giới thiệu</div>
            </Col>
            <Col md={2} onClick={onContact}>
              <div>Liên hệ</div>
            </Col>
            <Col
              md={10}
              onClick={handleDetailAccount}
              style={{
                position: "absolute",
                top: 0,
                right: 5,
                cursor: "pointer",
              }}
            >
              <div>
                <Avatar size="default" icon={<UserOutlined />}></Avatar>
                {userSession ? userSession.data.fullname : "Null"}
              </div>
            </Col>
            <Col
              md={2}
              onClick={handleLogout}
              style={{
                position: "absolute",
                top: 20,
                right: 5,
                cursor: "pointer",
              }}
            >
              <span>Đăng xuất</span>
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
              <Route
                path="/lessondetails/:id"
                element={<UserLessonDetails />}
              ></Route>
              <Route path="/quiz/:id" element={<Quiz />}></Route>
              <Route
                path="/account/account_details"
                element={<AccountDetails />}
              ></Route>
              <Route path="/account/update/" element={<EditAccount />}></Route>
              <Route path="/introdution" element={<Introdution />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
            </Routes>
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default User;
