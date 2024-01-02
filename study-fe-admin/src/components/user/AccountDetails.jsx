import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import ContentHeader from "../common/ContentHeader";
import { Button, Col, Row, Skeleton } from "antd";
import { EditOutlined } from "@ant-design/icons";

class AccountDetails extends Component {
  editAccount = (object) => {
    console.log("object in AccountDetails");
    console.log(object);

    const { navigate } = this.props.router;
    navigate("/user/account/update/");
 };
  render() {
    const { navigate } = this.props.router;
    const { isLoading } = this.props;
    const storedUserSession = sessionStorage.getItem("userSession");
    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;
    
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Thông tin tài khoản"
            className="site-page-header"
          ></ContentHeader>
          <Skeleton active />
        </>
      );
    }
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Thông tin tài khoản"
          className="site-page-header"
        ></ContentHeader>
        <Row>
          <Col md={10}>Tên đăng nhập</Col>
          <Col md={30}>{userSession.data.username}</Col>
        </Row>
        <Row>
          <Col md={10}>Mật khẩu</Col>
          <Col md={30}>{userSession.data.password}</Col>
        </Row>
        <Row>
          <Col md={10}>Họ và tên</Col>
          <Col md={30}>{userSession.data.fullname}</Col>
        </Row>
        <Row>
          <Col md={10}>Tuổi</Col>
          <Col md={30}>{userSession.data.date}</Col>
        </Row>
        <Row>
          <Col md={10}>Địa chỉ</Col>
          <Col md={30}>{userSession.data.adress}</Col>
        </Row>
        <Row>
          <Col md={10}>Số điện thoại</Col>
          <Col md={30}>{userSession.data.phone_number}</Col>
        </Row>
        <Row>
          <Button
            key={userSession.data.id}
            type="primary"
            size="small"
            onClick={() => this.editAccount(userSession.data)}
          >
            <EditOutlined style={{ marginRight: 8 }} />
            Sửa thông tin tài khoản
          </Button>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
);
