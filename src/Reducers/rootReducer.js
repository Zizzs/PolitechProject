import { ADD_GIF } from "../Constants/rootActions";
import { FETCH_GIF_LOADING } from "../Constants/rootActions";
import { FETCH_GIF_SUCCESS } from "../Constants/rootActions";
import { FETCH_GIF_ERROR } from "../Constants/rootActions";

const initialState = {
  likedGifs: [],
  shownGif: {
    gifURL: "",
    gifWeirdness: 0
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
    case FETCH_GIF_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_GIF_SUCCESS:
      return {
        ...state,
        loading: false,
        shownGif: {
          gifURL: action.payload.giphyURL,
          gifWeirdness: action.payload.giphyWeirdness
        }
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
export const getGifPending = state => state.loading;
export const getGifError = state => state.error;
