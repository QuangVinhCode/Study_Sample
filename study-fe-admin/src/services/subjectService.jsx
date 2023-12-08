import axios from "axios";
import { API_SUBJECT } from "./constant";

export default class ClassService {
  insertSubject = async (object) => {
    return await axios.post(API_SUBJECT, object);
  };
  getSubjects = async () => {
    return await axios.get(API_SUBJECT);
  };
  deleteSubject = async (id) => {
    return await axios.delete(API_SUBJECT + "/" + id);
  };
  getSubject = async (id) => {
    return await axios.get(API_SUBJECT + "/" + id + "/get");
  };
  updateSubject = async (id, object) => {
    return await axios.patch(API_SUBJECT + "/" + id, object);
  };
}
