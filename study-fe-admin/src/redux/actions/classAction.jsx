import ClassService from "../../services/classService";
import {
  CLASSES_SET,
  CLASS_DELETE,
  CLASS_SET,
  CLASS_STATE_CLEAR,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
} from "./actionTypes";

export const insertClass = (object, navigate) => async (dispatch) => {
  const service = new ClassService();

  try {
    console.log("Thêm lớp");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.insertClass(object);

    if (response.status === 201) {
      dispatch({
        type: CLASS_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Lớp đã được thêm",
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
  navigate("/classes/list");
};

export const getClasses = () => async (dispatch) => {
  const service = new ClassService();

  try {
    console.log("Danh sách lớp");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getClasses();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: CLASSES_SET,
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

export const deleteClass = (id) => async (dispatch) => {
  const service = new ClassService();

  try {
    console.log("Xóa lớp Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.deleteClass(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: CLASS_DELETE,
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

export const getClass = (id) => async (dispatch) => {
  const service = new ClassService();

  try {
    console.log("Lấy thông tin lớp Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getClass(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: CLASS_SET,
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

export const updateClass = (id,object, navigate) => async (dispatch) => {
  const service = new ClassService();

  try {
    console.log("Sửa lớp");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.updateClass(id,object);

    if (response.status === 201) {
      dispatch({
        type: CLASS_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Lớp đã được sửa",
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
  navigate("/classes/list");
};

export const clearClassState = () => (dispatch) => {
  dispatch({ type: CLASS_STATE_CLEAR });
};

export const clearClass = () => (dispatch) => {
  dispatch({
    type: CLASS_SET,
    payload: { id: "", classname: "" },
  });
};
