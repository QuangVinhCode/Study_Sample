import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../common/ContentHeader";
import { Button, Space, Table, Modal, Skeleton } from "antd";
import Column from "antd/lib/table/Column";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getClasses,
  clearClassState,
  deleteClass,
} from "../../redux/actions/classAction";

class ListClass extends Component {
  constructor() {
    super();

    this.state = {
      // dataSource: [
      //   {id : 1,classname: 'Lớp 1'},
      //   {id : 2,classname: 'Lớp 2'},
      //   {id : 3,classname: 'Lớp 3'},
      //   {id : 4,classname: 'Lớp 4'},
      //   {id : 5,classname: 'Lớp 5'},
      // ],

      object: {},
    };
  }
  componentDidMount = () => {
    this.props.getClasses();

    console.log("Did Mount");
  };

  componentWillUnmount = () => {
    this.props.clearClassState();
    console.log("Will Unmount");
  };

  editClass = (object) => {
     console.log(object);

     const { navigate } = this.props.router;
    console.log("EditClas is " + object.id);
     navigate("/dashboard/classes/update/" + object.id);
  };
  deleteClass = () => {
    this.props.deleteClass(this.state.object.id);
  };

  openDeleteConfirmModal = (object) => {
    this.setState({ ...this.state, object: object });
    console.log(object);
    const message = "Bạn có chắt chắn muốn xóa lớp " + object.classname;

    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.deleteClass,
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };

  render() {
    const { navigate } = this.props.router;
    const { objects, isLoading } = this.props;
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Danh sách lớp học"
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
          title="Danh sách lớp học"
          className="site-page-header"
        ></ContentHeader>
        <Table dataSource={objects} size="small" rowKey="id">
          <Column
            title="Mã lớp"
            key="id"
            dataIndex="id"
            width={40}
            align="center"
          ></Column>
          <Column
            title="Tên lớp"
            key="classname"
            dataIndex="classname"
            width={80}
            align="center"
          ></Column>
          <Column
            title="Tác vụ"
            key="action"
            dataIndex="action"
            width={140}
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.editClass(record)}
                >
                  <EditOutlined style={{ marginRight: 8 }} />
                  Sửa
                </Button>
                <Button
                  key={record.key}
                  type="primary"
                  danger
                  size="small"
                  onClick={() => this.openDeleteConfirmModal(record)}
                >
                  <DeleteOutlined style={{ marginRight: 8 }} />
                  Xóa
                </Button>
              </Space>
            )}
          ></Column>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  objects: state.classReducer.objects,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getClasses,
  clearClassState,
  deleteClass,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListClass)
);
