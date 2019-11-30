import { ADD_GIF, REMOVE_GIF, FETCH_GIF_LOADING, FETCH_GIF_SUCCESS, FETCH_GIF_ERROR } from "../Constants/rootActions";

const initialState = {
  likedGifs: [],
  shownGif: {
    gifURL: "",
    gifWeirdness: 0,
    gifTitle: "",
    gifSearchTerm: ""
  },
  loading: false,
  error: null
};

export function gifsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GIF:
      return Object.assign({}, state, {
        ...state,
        likedGifs: state.likedGifs.concat(action.payload)
      });
    case REMOVE_GIF:
      return {
        ...state,
        likedGifs: state.likedGifs.filter(item => item !== state[action.payload])
      }
    case FETCH_GIF_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_GIF_SUCCESS:
      return {
        ...state,
        loading: false,
        shownGif: action.payload
      };
    case FETCH_GIF_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}

export const getGif = state => state.shownGif;
export const getLikedGifs = state => state.likedGifs;
export const getGifPending = state => state.loading;
export const getGifError = state => state.error;
