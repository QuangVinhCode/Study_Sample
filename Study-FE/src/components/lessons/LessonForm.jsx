import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Upload,
} from "antd";
import React, { Component } from "react";
import { createRef } from "react";
import { getSubjects } from "../../redux/actions/subjectAction";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import LessonService from "../../services/lessonService";
const { Option } = Select;
class LessonForm extends Component {
  form = createRef();
  constructor(props) {
    super(props);

    this.state = {
      lesson: {
        id: "",
        lessonname: "",
        lessoncontent: "",
        subject: { id: "" },
      },
      previewImage: "",
      previewVisible: false,
      subjects: [],
    };
  }

  async componentDidMount() {
    try {
      // Assuming getSubjects is a Redux action
      await this.props.getSubjects();
      const subjects = this.props.subjects;
      this.setState({ subjects });
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }

  handlePreview = (file) => {
    console.log("object in before file pdf");
    console.log(file);
    console.log(file.thumbUrl);
    if (file.thumbUrl) {
      this.setState({
        ...this.state,
        previewImage: file.thumbUrl,
        previewVisible: true,
      });
    }
  };

  handleRemove = (value) => {
    console.log("object in upload pdf");
    return false;
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      return [e.fileList[1]];
    }
    const originalFileObj = e.fileList[0].originFileObj;
    console.log('Original File Object:', originalFileObj);
    return e && e.fileList;
  };

  handleSubjectChange = (value) => {
    // Cập nhật giá trị subject_id trong state
    this.setState({
      lesson: {
        ...this.state.lesson,
        subject: { id: value },
      },
    });
  };

  render() {
    const { open, onCreate, onCancel } = this.props;
    const { lesson } = this.props;
    const { subjects } = this.props;
    let title = "Thêm bài học";
    let okText = "Thêm";
    if (lesson.id) {
      title = "Cập nhật bài học";
      okText = "Sửa";
    }
    const pdfUrl = LessonService.getLessonPDFUrl(lesson.lessoncontent);
    const initialPDF = {
      url: pdfUrl,
      uid: lesson.lessoncontent,
    };
    return (
      <Modal
        open={open}
        title={title}
        okText={okText}
        cancelText="Hủy"
        onCancel={() => {
          this.form.current.resetFields();  // Reset form fields
          onCancel();
        }}
        onOk={() => {
          this.form.current
            .validateFields()
            .then((values) => {
              this.form.current.resetFields();
          
              console.log("-------object in values form--------");
              console.log(values);
              onCreate(values);
              
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          ref={this.form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
          key={"f" + lesson.id}
        >
          <Form.Item label="Mã bài học" name="id" initialValue={lesson.id}>
            <Input readOnly></Input>
          </Form.Item>
          <Form.Item
            label="Tên bài học"
            name="lessonname"
            initialValue={lesson.lessonname}
            rules={[{ required: true, message: "Yêu cầu nhập tên bài học" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Môn học"
            name="subject_id"
            initialValue={lesson.subject ? lesson.subject.id : undefined}
            rules={[{ required: true, message: "Yêu cầu chọn môn học" }]}
          >
            <Select onChange={this.handleSubjectChange}>
              {subjects.map((subject) => (
                <Option key={subject.id} value={subject.id}>
                  {subject.subjecttitle + " " + subject.classInfo.classname}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Nội dung file PDF"
            name="lessoncontent"
            initialValue={[initialPDF]}
            valuePropName="fileList"
            rules={[{ required: true, message: "Yêu cầu chọn file pdf" }]}
            getValueFromEvent={this.normFile}
          >
            <Upload       
              listType="text"
              onPreview={this.handlePreview}
              onRemove={this.handleRemove}
              accept=".pdf"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button type="primary">Tải lên</Button>
            </Upload>
          </Form.Item>
          <Divider></Divider>
          {this.state.previewVisible && (
            <Image
              src={this.state.previewImage}
              style={{ with: 200 }}
              preview={{ visible: false }}
            ></Image>
          )}
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  subjects: state.subjectReducer.subjects,
});

const mapDispatchToProps = {
  getSubjects,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LessonForm)
);