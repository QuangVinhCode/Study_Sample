import React, { Component } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import LessonService from "../../services/lessonService";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button, Modal } from "antd";

class LessonDetails extends Component {
  render() {
    const { lesson, onCancel, open } = this.props;
    const pdfUrl = LessonService.getLessonPDFUrl(lesson.lessoncontent);

    return (
      <Modal
        title="Chi tiết bài học"
        open={open} // Correct prop is "visible" instead of "open"
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
      >
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </Modal>
    );
  }
}

export default LessonDetails;
