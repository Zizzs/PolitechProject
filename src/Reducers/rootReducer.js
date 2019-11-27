import { ADD_GIF } from "../Constants/rootActions";

const initialState = {
  likedGifs: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_GIF) {
    return Object.assign({}, state, {
      likedGifs: state.likedGifs.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
