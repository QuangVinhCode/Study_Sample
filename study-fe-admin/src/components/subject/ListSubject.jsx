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
  getSubjects,
  clearSubjectState,
  deleteSubject,
} from "../../redux/actions/subjectAction";

class ListSubject extends Component {
  constructor() {
    super();

    this.state = {
     

      object: {},
    };
  }
  componentDidMount = () => {
    this.props.getSubjects();

    console.log("Did Mount");
  };

  componentWillUnmount = () => {
    this.props.clearSubjectState();
    console.log("Will Unmount");
  };

  editSubject = (object) => {
     console.log(object);

     const { navigate } = this.props.router;
    console.log("EditSubject is " + object.id);
     navigate("/dashboard/subjects/update/" + object.id);
  };
  deleteSubject = () => {
    this.props.deleteSubject(this.state.object.id); 
  };

  openDeleteConfirmModal = (object) => {
    this.setState({ ...this.state, object: object });
    console.log(object);
    const message = "Bạn có chắt chắn muốn xóa môn " + object.subjecttitle;

    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.deleteSubject,
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };

  render() {
    const { navigate } = this.props.router;
    const { subjects, isLoading } = this.props;
    console.log("object")
    console.log(subjects);
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
        <Table dataSource={subjects} size="small" rowKey="id">
          <Column
            title="Mã môn học"
            key="id"
            dataIndex="id"
            width={40}
            align="center"
          ></Column>
          <Column
            title="Tên môn học"
            key="subjecttitle"
            dataIndex="subjecttitle"
            width={80}
            align="center"
          ></Column>
          <Column
            title="Lớp học"
            key="classInfo"
            dataIndex="classInfo"
            width={80}
            align="center"
            render={(classInfo) => (classInfo ? classInfo.classname : 'N/A')}
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
                  onClick={() => this.editSubject(record)}
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
  subjects: state.subjectReducer.subjects,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getSubjects,
  clearSubjectState,
  deleteSubject,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListSubject)
);
