import axios from "axios";
import { API_CLASS } from "./constant";

export default class ClassService {
  insertClass = async (object) => {
    return await axios.post(API_CLASS, object);
  };
  getClasses = async () => {
    return await axios.get(API_CLASS);
  };
  deleteClass = async (id) => {
    return await axios.delete(API_CLASS + "/" + id);
  };
  getClass = async (id) => {
    return await axios.get(API_CLASS + "/" + id + "/get");
  };
  updateClass = async (id, object) => {
    return await axios.patch(API_CLASS + "/" + id, object);
  };
}
