import React, { Component } from "react";
import withRouter from "../helpers/withRouter"; 
import { Button, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { EditOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getLessons } from "../redux/actions/lessonAction";

class ListLesson extends Component {
  constructor() {
    super();

    this.state = {
     

      object: {},
    };
  }
  componentDidMount = () => {
    this.props.getLessons();

    console.log("Did Mount");
  };

  componentWillUnmount = () => {
    
    console.log("Will Unmount");
  };

  onQuiz = (object) => {
    console.log(object);

    const { navigate } = this.props.router;
    console.log("Quiz is " + object.id);
    navigate("/quiz/" + object.id);
  };
  render() {
    const { lessons } = this.props;

    return (
      <>
        <Table dataSource={lessons} size="small" rowKey="id">
          <Column
            title="Mã bài học"
            key="id"
            dataIndex="id"
            width={40}
            align="center"
          ></Column>
          <Column
            title="Tên bài học"
            key="lessonname"
            dataIndex="lessonname"
            width={80}
            align="center"
          ></Column>
          <Column
            title="Môn học"
            key="subject"
            dataIndex="subject"
            width={80}
            align="center"
            render={(subject) =>
              subject
                ? subject.subjecttitle + " " + subject.classInfo.classname
                : "N/A"
            }
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
                  onClick={() => this.onQuiz(record)}
                >
                  <EditOutlined style={{ marginRight: 8 }} />
                  Làm bài tập
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
  lessons: state.lessonReducer.lessons,
});

const mapDispatchToProps = {
  getLessons,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListLesson)
);
