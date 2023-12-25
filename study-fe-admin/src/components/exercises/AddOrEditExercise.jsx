import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import {
  Col,
  Divider,
  Row,
  Form,
  Input,
  Button,
  Popconfirm,
  Select,
} from "antd";
import ContentHeader from "../common/ContentHeader";
import {
  insertExercise,
  getExercise,
  clearExercise,
  updateExercise,
} from "../../redux/actions/exerciseAction";
import { getLessons } from "../../redux/actions/lessonAction";
import { connect } from "react-redux";
import "./Exercises.css";
const { Option } = Select;
class AddOrEditExercise extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      exercise: {
        id: "",
        exercisecontent: "",
        answera: "",
        answerb: "",
        answerc: "",
        answerd: "",
        correctanswer: "",
        lesson_id: "",
        account_id: "",
      },
    };
  }

  componentDidMount = () => {
    this.props.getLessons();
    if (this.props.router.params.id) {
      this.props.getExercise(this.props.router.params.id);
    } else {
      this.props.clearExercise();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Kiểm tra xem nextProps có object không và object có thay đổi không
    if (nextProps.exercise && prevState.exercise.id !== nextProps.exercise.id) {
      // Nếu có thay đổi, cập nhật state với dữ liệu từ nextProps.exercise
      return {
        ...prevState,
        exercise: nextProps.exercise,
      };
    } else if (!nextProps.exercise) {
      // Nếu không có nextProps.exercise, reset state với giá trị mặc định
      return {
        ...prevState,
        exercise: {
          id: "",
          exercisecontent: "",
          answera: "",
          answerb: "",
          answerc: "",
          answerd: "",
          correctanswer: "",
          lesson_id: "",
          account_id: "",
        },
      };
    }
    // Không cần cập nhật state
    return null;
  }
  confirmUpdate = () => {
    console.log("Cập nhật bài học");
    this.formRef.current.submit();
  };

  onSubmitForm = (values) => {
    console.log(values);

    const { navigate } = this.props.router;
    const { id } = this.state.exercise;
    //this.state.exercise.id
    if (!id) {
      this.props.insertExercise(values, navigate);
    } else {
      this.props.updateExercise(id, values, navigate);
    }
  };

  render() {
    const { navigate } = this.props.router;
    const { isLoading } = this.props;
    const { lessons } = this.props;
    const { exercise } = this.state;
    const storedUserSession = sessionStorage.getItem("userSession");
    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;

    console.log("oject in this.state:");
    console.log(exercise);
    let title = "Thêm bài tập mới";
    if (exercise.id) {
      title = "Cập nhật bài tập";
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
          key={exercise.id}
          ref={this.formRef}
          style={{ marginTop: -20, marginLeft: 300 }}
        >
          <Row>
            <Col md={12}>
              <Form.Item
                label="Mã bài tập"
                name="id"
                initialValue={exercise.id}
                style={{ paddingLeft: 20 }}
              >
                <Input readOnly></Input>
              </Form.Item>
              <Form.Item
                label="Câu hỏi"
                name="exercisecontent"
                initialValue={exercise.exercisecontent}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập câu hỏi",
                  },
                ]}
                style={{ paddingLeft: 20 }}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Đáp án A"
                name="answera"
                initialValue={exercise.answera}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đáp án A",
                  },           
                ]}
                style={{ paddingLeft: 20 }}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Đáp án B"
                name="answerb"
                initialValue={exercise.answerb}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đáp án B",
                  },
                ]}
                style={{ paddingLeft: 20 }}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Đáp án C"
                name="answerc"
                initialValue={exercise.answerc}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đáp án C",
                  },
                ]}
                style={{ paddingLeft: 20 }}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Đáp án D"
                name="answerd"
                initialValue={exercise.answerd}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đáp D",
                  },
                ]}
                style={{ paddingLeft: 20 }}
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label="Câu trả lời"
                name="correctanswer"
                initialValue={exercise.correctanswer}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đáp án",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        getFieldValue("answera") === value ||
                        getFieldValue("answerb") === value ||
                        getFieldValue("answerc") === value ||
                        getFieldValue("answerd") === value
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Câu trả lời phải nằm trong 4 đáp án")
                      );
                    },
                  }),
                ]}
                style={{ paddingLeft: 20 }}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Thuộc bài học"
                name="lesson_id"
                initialValue={exercise.lesson ? exercise.lesson.id : undefined}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn bài học",
                  },
                ]}
                style={{ paddingLeft: 20 }}
              >
                <Select placeholder="Chọn bài học">
                  {lessons.map((lessonItem) => (
                    <Option key={lessonItem.id} value={lessonItem.id}>
                      {lessonItem.lessonname}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Tài khoản giao bài tập"
                name="account_id"
                initialValue={userSession.data.id}
                style={{ paddingLeft: 20 }}
                hidden={true}
              >
                <Input></Input>
              </Form.Item>

              <Divider></Divider>
              {!exercise.id && (
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ float: "right" }}
                  loading={isLoading}
                >
                  Thêm mới
                </Button>
              )}
              {exercise.id && (
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
  exercise: state.exerciseReducer.exercise,
  lessons: state.lessonReducer.lessons,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  insertExercise,
  getExercise,
  clearExercise,
  updateExercise,
  getLessons,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddOrEditExercise)
);
