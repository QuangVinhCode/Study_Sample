import React, { Component } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import LessonService from "../../services/lessonService";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button, Col, Modal, Row } from "antd";

class ExerciseDetails extends Component {
  render() {
    const { exercise, onCancel, open } = this.props;

    return (
      <Modal
        title="Chi tiết bài học"
        open={open} // Correct prop is "visible" instead of "open"
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
      >
        <Row>
          <Col md={10}>Môn học</Col>
          <Col md={10}>{exercise.lesson.lessonname}</Col>
        </Row>
        <Row>
          <Col md={10}>Mã bài tập</Col>
          <Col md={10}>{exercise.id}</Col>
        </Row>
        <Row>
          <Col md={10}>Nội dung câu hỏi</Col>
          <Col md={10}>{exercise.exercisecontent}</Col>
        </Row>
        <Row>
          <Col md={10}>Đáp án A</Col>
          <Col md={10}>{exercise.answera}</Col>
        </Row>
        <Row>
          <Col md={10}>Đáp án B</Col>
          <Col md={10}>{exercise.answerb}</Col>
        </Row>
        <Row>
          <Col md={10}>Đáp án C</Col>
          <Col md={10}>{exercise.answerc}</Col>
        </Row>
        <Row>
          <Col md={10}>Đáp án D</Col>
          <Col md={10}>{exercise.answerd}</Col>
        </Row>
        <Row>
          <Col md={10}>Câu trả lời</Col>
          <Col md={10}>
            {exercise.correctanswer === "answera" ? "Đáp án A" : ""}
            {exercise.correctanswer === "answerb" ? "Đáp án B" : ""}
            {exercise.correctanswer === "answerc" ? "Đáp án C" : ""}
            {exercise.correctanswer === "answerd" ? "Đáp án D" : ""}
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ExerciseDetails;
