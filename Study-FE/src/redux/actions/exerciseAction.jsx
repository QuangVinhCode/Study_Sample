import ExerciseService from "../../services/exerciseService";
import {
  CLASSES_SET,
  CLASS_DELETE,
  CLASS_SET,
  CLASS_STATE_CLEAR,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  EXERCISES_SET,
  EXERCISE_DELETE,
  EXERCISE_SET,
  EXERCISE_STATE_CLEAR,
} from "./actionTypes";

export const insertExercise = (object, navigate) => async (dispatch) => {
  const service = new ExerciseService();

  try {
    console.log("Thêm bài tập");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.insertExercise(object);

    if (response.status === 201) {
      dispatch({
        type: EXERCISE_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Bài tập đã được thêm",
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
    console.log(response);
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
  navigate("/dashboard/exercises/list");
};

export const getExercises = () => async (dispatch) => {
  const service = new ExerciseService();

  try {
    console.log("Danh sách lớp");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getExercises();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: EXERCISES_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

export const deleteExercise = (id) => async (dispatch) => {
  const service = new ExerciseService();

  try {
    console.log("Xóa bài tập Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.deleteExercise(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: EXERCISE_DELETE,
        payload: id,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

export const getExercise = (id) => async (dispatch) => {
  const service = new ExerciseService();

  try {
    console.log("Lấy thông tin bài tập Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getExercise(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: EXERCISE_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

export const updateExercise = (id, object, navigate) => async (dispatch) => {
  const service = new ExerciseService();

  try {
    console.log("Sửa bài tập");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.updateExercise(id, object);

    if (response.status === 201) {
      dispatch({
        type: EXERCISE_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Bài tập đã được sửa",
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
    console.log(response);
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
  navigate("/dashboard/exercises/list");
};

export const clearExerciseState = () => (dispatch) => {
  dispatch({ type: EXERCISE_STATE_CLEAR });
};

export const clearExercise = () => (dispatch) => {
  dispatch({
    type: EXERCISE_SET,
    payload: { id: "", classname: "" },
  });
};

export const getExercisesByLesson = async (id) => {
  const service = new ExerciseService();
  try {
    const response = await service.getExercisesByLesson(id);
    console.log("object in response");
    console.log(response);
    const data = await response.data;
    console.log("object in response.json().data");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
