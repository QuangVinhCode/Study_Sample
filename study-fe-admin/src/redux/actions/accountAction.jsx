import AccountService from "../../services/accountService";
import {
  ACCOUNT_SET,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  LOG_IN,
  LOG_OUT,
} from "./actionTypes";

export const loginAccount = (object) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Đăng nhập Action");
    console.log(object);

    const response = await service.loginAccount(
      object.username,
      object.password
    );
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: LOG_IN,
        payload: response.data,
      });
      console.log("object in data");
      console.log(response.data);
      const userSession = {
        data: response.data,
      };
      sessionStorage.setItem("userSession", JSON.stringify(userSession));
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
};

export const insertAccount = (object, navigate) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Thêm bài học");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("object in action");
    console.log(object);
    const response = await service.insertAccount(object);
    console.log("response");
    console.log(response);
    if (response.status === 201) {
      dispatch({
        type: ACCOUNT_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Tài khoản đã được tạo thành công",
      });
      navigate("/login");
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
