import { CLASSES_SET, CLASS_DELETE, CLASS_SET, CLASS_STATE_CLEAR } from "./../actions/actionTypes";
const initialState = {
  object: {},
  objects: [],
};

const classReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLASS_SET:
      return { ...state, object: payload };
    case CLASSES_SET:
      return { ...state, objects: payload };
    case CLASS_DELETE:
      return { ...state, objects: state.objects.filter((item) => item.id !== payload), };
    case CLASS_STATE_CLEAR:
      return {
        object: {},
        objects: [],
      };
    default:
      return state;
  }
};

export default classReducer;
