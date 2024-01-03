import React, { Component } from "react";
import PropTypes from "prop-types";
import ContentHeader from "../common/ContentHeader";
import LessonList from "./LessonList";
import withRouter from "../../helpers/withRouter";
import { Button, Col, Modal, Row } from "antd";
import LessonForm from "./LessonForm";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  insertLesson,
  getLessons,
  deleteLesson,
  updateLesson,
} from "../../redux/actions/lessonAction";
import LessonDetails from "./LessonDetails";
class ListLessons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      lesson: {
        id: "",
        lessonname: "",
        lessoncontent: "",
        subject: { id: "" },
      },
      details: false,
    };
  }
  componentDidMount = () => {
    this.props.getLessons();
    console.log("object in did mount");
  };

  onCreate = (values) => {
    console.log("object");
    console.log(values);
    if (values.id)
    {
      this.props.updateLesson(values);
    }else{
      this.props.insertLesson(values);
    }
   
    this.setState({...this.state,lesson: {},open:false});
  };

  deleteLesson = () => {
    this.props.deleteLesson(this.state.lesson.id);
    console.log("Delete lesson in ListLesson");
  };

  onDeleteConfirm = (value) => {
    this.setState({ ...this.state, lesson: value });

    const message = "Bạn có muốn xóa bài học có tên " + value.lessonname;

    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.deleteLesson,
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };
  onEdit = (value) => {
    this.setState({ ...this.state, lesson: value,open:true });
  };
  onDetails = (value) => {
    this.setState({ ...this.state, lesson: value ,details: true});
  }
  render() {
    const { navigate } = this.props.router;
    const { open } = this.state;
    const { details } = this.state;
    const { lessons } = this.props;
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Danh sách bài học"
          className="site-page-header"
        ></ContentHeader>

        <Row>
          <Col md={24}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ ...this.state, open: true });
              }}
            >
              Thêm bài học mới
            </Button>
          </Col>
        </Row>
        <LessonList
          dataSource={lessons}
          onDeleteConfirm={this.onDeleteConfirm}
          onEdit={this.onEdit}
          onDetails={this.onDetails}
        />
        {this.state.details && (
          <LessonDetails
            lesson={this.state.lesson}
            open={details}
            onCancel={() => {
            this.setState({ ...this.state,lesson: {}, details: false });
            
          }}
          />
        )}
        <LessonForm
          lesson={this.state.lesson}
          open={open}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({ ...this.state,lesson: {}, open: false });
            
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  lessons: state.lessonReducer.lessons,
});

const mapDispatchToProps = {
  insertLesson,
  getLessons,
  deleteLesson,
  updateLesson,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListLessons));