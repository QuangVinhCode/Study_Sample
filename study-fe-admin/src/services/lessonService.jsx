import axios from "axios";
import { API_LESSON } from "./constant";

export default class LessonService {
  insertLesson = async (object) => {
    let formData = new FormData()

    formData.append("lessonname",object.lessonname)
    formData.append("subject.id", object.subject.id);
    if (object.lessoncontent[0].originFileObj)
    {
        formData.append("pdfFile",object.lessoncontent[0].originFileObj)
    }

    return await axios.post(API_LESSON, formData);
  };
  getLessons = async () => {
    return await axios.get(API_LESSON);
  };
  deleteLesson = async (id) => {
    return await axios.delete(API_LESSON + "/" + id);
  };
  getLesson = async (id) => {
    return await axios.get(API_LESSON + "/" + id + "/get");
  };
  updateLesson = async (id, object) => {
    let formData = new FormData()

    formData.append("lessonname",object.lessonname)
    formData.append("subject.id", object.subject.id);
    if (object.lessoncontent[0].originFileObj)
    {
        formData.append("pdfFile",object.lessoncontent[0].originFileObj)
    }

    return await axios.patch(API_LESSON + "/" + id, formData);
  };
  static getLessonPDFUrl = (filename) => {
    return API_LESSON + "/content/" + filename;
  };
}
