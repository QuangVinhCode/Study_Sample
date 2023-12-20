import {
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  LESSONS_SET,
  LESSON_APPEND,
  LESSON_DELETE,
  LESSON_SET,
  LESSON_UPDATE,
} from "./actionTypes";
import LessonService from "../../services/lessonService";
export const insertLesson = (object) => async (dispatch) => {
  const service = new LessonService();

  try {
    console.log("Thêm bài học");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("object in action");
    console.log(object);
    const response = await service.insertLesson(object);
    console.log("response");
    console.log(response);
    if (response.status === 201) {
      dispatch({
        type: LESSON_SET,
        payload: response.data,
      });

      dispatch({
        type: LESSON_APPEND,
        payload: response.data
      })

      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Bài học đã được thêm",
      });
      dispatch(getLessons());
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
};
export const getLessons = () => async (dispatch) => {
  const service = new LessonService();

  try {
    console.log("Danh sách bài học");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getLessons();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: LESSONS_SET,
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

export const getLesson = (id) => async (dispatch) => {
  const service = new LessonService();

  try {
    console.log("Lấy bài học");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getLesson(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: LESSON_SET,
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

export const deleteLesson = (id) => async (dispatch) => {
  const service = new LessonService();

  try {
    console.log("Xóa bài học Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.deleteLesson(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: LESSON_DELETE,
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

export const updateLesson = (object) => async (dispatch) => {
  const service = new LessonService();

  try {
    console.log("Sửa bài học");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("object in action");
    console.log(object);
    const {id} = object;
    const response = await service.updateLesson(id,object);
    console.log("response");
    console.log(response);
    if (response.status === 201) {
      dispatch({
        type: LESSON_SET,
        payload: response.data,
      });
      console.log("object in data");
      console.log(response.data);
      dispatch({
        type: LESSON_UPDATE,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Bài học đã được sửa",
      });
      dispatch(getLessons());
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
    console.log(error);
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};