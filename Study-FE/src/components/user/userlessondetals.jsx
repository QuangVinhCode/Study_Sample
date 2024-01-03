import { Button, Skeleton } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { getLesson } from "../../redux/actions/lessonAction";
import ContentHeader from "../common/ContentHeader";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LessonService from "../../services/lessonService";
class userlessondetals extends Component {
  componentDidMount = () => {
    this.props.getLesson(this.props.router.params.id);
    console.log("Did Mount");
  };

  componentWillUnmount = () => {
    console.log("Will Unmount");
  };
  onPerFom = () => {
    const { navigate } = this.props.router;
    navigate("/user/quiz/" + this.props.router.params.id);
  };
  render() {
    const { navigate } = this.props.router;
    const { lesson, isLoading } = this.props;
    const pdfUrl = LessonService.getLessonPDFUrl(lesson.lessoncontent);
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Thông tin bài học"
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
          title="Thông tin bài học"
          className="site-page-header"
        ></ContentHeader>
        <div
          className="site-card-wrapper"
          style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
        >
        <Button onClick={() => this.onPerFom()}>Thực hiện bài tập</Button>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  lesson: state.lessonReducer.lesson,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getLesson,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(userlessondetals)
);
