import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import {
  Col,
  Divider,
  Row,
  Form,
  Input,
  Button,
  Select,
  Popconfirm,
} from "antd";
import ContentHeader from "../common/ContentHeader";
import {
  insertSubject,
  getSubject,
  clearSubject,
  updateSubject,
} from "../../redux/actions/subjectAction";
import { getClasses } from "../../redux/actions/classAction";
import { connect } from "react-redux";
const { Option } = Select;
class AddOrEditSubject extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      subject: {
        id: "",
        subjecttitle: "",
        classInfo: {
          id: "",
        },
      },
    };
  }
  componentDidMount = () => {
    this.props.getClasses();
    if (this.props.router.params.id) {
      this.props.getSubject(this.props.router.params.id);
    } else {
      this.props.clearSubject();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Kiểm tra xem nextProps có object không và object có thay đổi không
    if (nextProps.subject && prevState.subject.id !== nextProps.subject.id) {
      // Nếu có thay đổi, cập nhật state với dữ liệu từ nextProps.object
      return {
        ...prevState,
        subject: nextProps.subject,
      };
    } else if (!nextProps.subject) {
      // Nếu không có nextProps.object, reset state với giá trị mặc định
      return {
        ...prevState,
        subject: {
          id: "",
          subjecttitle: "",
          classInfo: {
            id: "",
          },
        },
      };
    }
    // Không cần cập nhật state
    return null;
  }
  confirmUpdate = () => {
    console.log("Cập nhật môn học");
    this.formRef.current.submit();
  };

  onSubmitForm = (values) => {
    console.log("values in onSubmitForm");
    console.log(values);

    const { navigate } = this.props.router;
    const { id } = this.state.subject;
    //this.state.object.id

    const payload = {
      id: id, // Use null for new items, and the actual ID for updates
      subjecttitle: values.subjecttitle,
      classInfo: {
        id: values.class_id,
      },
    };
    console.log("payload");
    console.log(payload);
    if (!id) {
      this.props.insertSubject(payload, navigate);
    } else {
      this.props.updateSubject(id, payload, navigate);
    }
  };

  render() {
    const { navigate } = this.props.router;
    const { isLoading } = this.props;
    const { subject } = this.state;
    const { classes } = this.props;

    let title = "Thêm môn học mới";
    if (subject.id) {
      title = "Cập nhật môn học";
    }
    return (
      <div>
        <ContentHeader
          navigate={navigate}
          title={title}
          className="site-page-header"
        ></ContentHeader>

        <Form
          layout="vertical"
          className="form"
          onFinish={this.onSubmitForm}
          key={subject.id}
          ref={this.formRef}
        >
          <Row>
            <Col md={12}>
              <Form.Item label="Mã môn học" name="id" initialValue={subject.id}>
                <Input readOnly></Input>
              </Form.Item>
              <Form.Item
                label="Tên môn học"
                name="subjecttitle"
                initialValue={subject.subjecttitle}
                rules={[{ required: true, min: 2 }]}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Lớp học"
                name="class_id"
                initialValue={subject.classInfo ? subject.classInfo.id : undefined} // Assuming 'classInfo' contains the class information
                rules={[{ required: true, message: "Please select a class" }]}
              >
                <Select placeholder="Chọn môn học">
                  {classes.map((classItem) => (
                    <Option key={classItem.id} value={classItem.id}>
                      {classItem.classname}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Divider></Divider>
              {!subject.id && (
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ float: "right" }}
                  loading={isLoading}
                >
                  Thêm mới
                </Button>
              )}
              {subject.id && (
                <Popconfirm
                  title="Bạn muốn cập nhật không ?"
                  onConfirm={this.confirmUpdate}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ float: "right" }}
                    loading={isLoading}
                  >
                    Cập nhật
                  </Button>
                </Popconfirm>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subject: state.subjectReducer.subject,
  classes: state.classReducer.objects,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  insertSubject,
  getSubject,
  clearSubject,
  updateSubject,
  getClasses,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddOrEditSubject)
);
