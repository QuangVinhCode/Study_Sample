import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../common/ContentHeader";
import { Button, Space, Table, Modal, Skeleton } from "antd";
import Column from "antd/lib/table/Column";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getExercises,
  clearExerciseState,
  deleteExercise,
} from "../../redux/actions/exerciseAction";
import ExerciseDetails from "./ExerciseDetails";

class ListExercise extends Component {
  constructor() {
    super();

    this.state = {
      exercise: {},
      details: false,
    };
  }
  componentDidMount = () => {
    this.props.getExercises();

    console.log("Did Mount");
  };

  componentWillUnmount = () => {
    this.props.clearExerciseState();
    console.log("Will Unmount");
  };

  editExercise = (exercise) => {
    console.log(exercise);

    const { navigate } = this.props.router;
    console.log("EditExercise is " + exercise.id);
    navigate("/dashboard/exercises/update/" + exercise.id);
  };
  onDetails = (exercise) => {
    this.setState({ ...this.state, exercise: exercise, details: true });
  };

  deleteExercise = () => {
    this.props.deleteExercise(this.state.exercise.id);
  };

  openDeleteConfirmModal = (exercise) => {
    this.setState({ ...this.state, exercise: exercise });
    console.log(exercise);
    const message =
      "Bạn có chắt chắn muốn xóa bài tập " + exercise.exercisecontent;

    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.deleteExercise,
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };

  render() {
    const { details } = this.state;
    const { navigate } = this.props.router;
    const { exercises, isLoading } = this.props;
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Danh sách bài tập"
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
          title="Danh sách bài tập"
          className="site-page-header"
        ></ContentHeader>
        <Table dataSource={exercises} size="small" rowKey="id">
          <Column
            title="Mã bài tập"
            key="id"
            dataIndex="id"
            width={40}
            align="center"
          ></Column>
          <Column
            title="Tên bài tập"
            key="exercisecontent"
            dataIndex="exercisecontent"
            width={140}
            align="center"
          ></Column>
          <Column
            title="Tác vụ"
            key="action"
            dataIndex="action"
            width={40}
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.onDetails(record)}
                >
                  <EyeOutlined style={{ marginRight: 8 }} />
                  Xem
                </Button>
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.editExercise(record)}
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
        {this.state.details && (
          <ExerciseDetails
            exercise={this.state.exercise}
            open={details}
            onCancel={() => {
              this.setState({ ...this.state, exercise: {}, details: false });
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  exercises: state.exerciseReducer.exercises,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getExercises,
  clearExerciseState,
  deleteExercise,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListExercise)
);
