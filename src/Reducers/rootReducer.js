import { ADD_GIF } from "../Constants/rootActions";

const initialState = {
  likedGifs: [],
  shownGif: {
    gifURL: "",
    gifWeirdness: 0
  },
  loading: false
};

function gifsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GIF:
      return Object.assign({}, state, {
        likedGifs: state.likedGifs.concat(action.payload)
      });
    default:
      return state;
  }
}

export default gifsReducer;
