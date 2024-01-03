import axios from "axios";
import { API_CLASS, API_EXERCISE } from "./constant";

export default class ClassService {
  insertExercise = async (object) => {
    return await axios.post(API_EXERCISE, object);
  };
  getExercises = async () => {
    return await axios.get(API_EXERCISE);
  };
  deleteExercise = async (id) => {
    return await axios.delete(API_EXERCISE + "/" + id);
  };
  getExercise = async (id) => {
    return await axios.get(API_EXERCISE + "/" + id + "/get");
  };
  updateExercise = async (id, object) => {
    return await axios.patch(API_EXERCISE + "/" + id, object);
  };
  getExercisesByLesson = async (id) => {
    return await axios.patch(API_EXERCISE + "/quiz/" + id);
  };
}
