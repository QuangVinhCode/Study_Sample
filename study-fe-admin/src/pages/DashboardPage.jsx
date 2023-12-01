import "./DashboardPage.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Layout, Menu, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdAddCircleOutline,
  MdChat,
  MdClass,
  MdFormatListBulleted,
  MdGames,
  MdLogout,
  MdOutlineHome,
  MdOutlinePlayLesson,
  MdSubject,
} from "react-icons/md";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "../components/home/Home";
import AddOrEditClass from "../components/classes/AddOrEditClass";
import ListClass from "../components/classes/ListClass";
import { useDispatch, useSelector } from "react-redux";
import { setError, setMessage } from "../redux/actions/commonAction";
const { Header, Sider, Content } = Layout;

function DashboardPage() {
  const [marginLeft, setMarginLeft] = useState(200);
  const [collapsed, setCollapsed] = useState(false);

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
  }, [msg, err]);

  const siteLayoutStyle = { marginLeft: marginLeft };
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <h2>{collapsed ? "SW" : "Study Web"}</h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <MdOutlineHome />,
              label: "Trang chủ",
              onClick: () => navigate("/"),
            },
            {
              key: "2",
              icon: <MdClass />,
              label: "Lớp học",
              children: [
                {
                  key: "21",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách lớp học",
                  onClick: () => navigate("/classes/list"),
                },
                {
                  key: "22",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm lớp học",
                  onClick: () => navigate("/classes/add"),
                },
              ],
            },
            {
              key: "3",
              icon: <MdSubject />,
              label: "Môn học",
              children: [
                {
                  key: "31",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách môn học",
                },
                {
                  key: "32",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm môn học",
                },
              ],
            },
            {
              key: "4",
              icon: <MdOutlinePlayLesson />,
              label: "Bài học",
              children: [
                {
                  key: "41",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách bài học",
                },
                {
                  key: "42",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm bài học",
                },
              ],
            },
            {
              key: "5",
              icon: <MdGames />,
              label: "Bài tập",
              children: [
                {
                  key: "51",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách bài tập",
                },
                {
                  key: "52",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm bài tập",
                },
              ],
            },
            {
              key: "6",
              icon: <UserOutlined />,
              label: "Tài khoản",
              children: [
                {
                  key: "61",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách Tài khoản",
                },
                {
                  key: "62",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm Tài khoản",
                },
              ],
            },
            {
              key: "7",
              icon: <MdChat />,
              label: "Bình luận",
              children: [
                {
                  key: "71",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách bình luận",
                },
                {
                  key: "72",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm bình luận",
                },
              ],
            },
            {
              key: "8",
              icon: <MdLogout />,
              label: "Đăng xuất",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={siteLayoutStyle}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            right: 16,
            left: marginLeft + 16,
            top: 0,
            position: "fixed",
            height: 70,
          }}
        >
          <Row>
            <Col md={18}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => {
                    const sts = !collapsed;
                    setCollapsed(sts);
                    setMarginLeft(sts ? 80 : 200);
                  },
                }
              )}
            </Col>
            <Col md={6}>
              <div>
                <Avatar size="default" icon={<UserOutlined />}></Avatar> Lê
                Quang Vinh
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "80px 24px 16px 24px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="content-panel">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/classes/add"
                element={<AddOrEditClass key="a" />}
              ></Route>
              <Route
                path="/classes/update/:id"
                element={<AddOrEditClass key="u"/>}
              ></Route>
              <Route path="/classes/list" element={<ListClass />}></Route>
            </Routes>

            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardPage;
