import SubjectService from "../../services/subjectService";
import {
  SUBJECTS_SET,
  SUBJECT_DELETE,
  SUBJECT_SET,
  SUBJECT_STATE_CLEAR,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
} from "./actionTypes";

export const insertSubject = (object, navigate) => async (dispatch) => {
  const service = new SubjectService();

  try {
    console.log("Thêm môn học Action");
    console.log("object in insertSubject");
    console.log(object);
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.insertSubject(object);

    if (response.status === 201) {
      dispatch({
        type: SUBJECT_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Môn học đã được thêm",
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
  navigate("/subjects/list");
};

export const getSubjects = () => async (dispatch) => {
  const service = new SubjectService();

  try {
    console.log("Danh sách môn học");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getSubjects();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: SUBJECTS_SET,
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

export const deleteSubject = (id) => async (dispatch) => {
  const service = new SubjectService();

  try {
    console.log("Xóa môn học");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.deleteSubject(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: SUBJECT_DELETE,
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

export const getSubject = (id) => async (dispatch) => {
  const service = new SubjectService();

  try {
    console.log("Lấy thông tin môn học Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getSubject(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: SUBJECT_SET,
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

export const updateSubject = (id, object, navigate) => async (dispatch) => {
  const service = new SubjectService();

  try {
    console.log("Sửa môn học Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.updateSubject(id, object);

    if (response.status === 201) {
      dispatch({
        type: SUBJECT_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Môn học đã được sửa",
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
  navigate("/subjects/list");
};

export const clearSubjectState = () => (dispatch) => {
  dispatch({ type: SUBJECT_STATE_CLEAR });
};

export const clearSubject = () => (dispatch) => {
  dispatch({
    type: SUBJECT_SET,
    payload: {
      id: "",
      subjecttitle: "",
      classInfo: {
        id: "",
      },
    },
  });
};
