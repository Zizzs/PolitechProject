import { ADD_GIF } from "../Constants/rootActions";
import { FETCH_GIF_LOADING } from "../Constants/rootActions";
import { FETCH_GIF_SUCCESS } from "../Constants/rootActions";
import { FETCH_GIF_ERROR } from "../Constants/rootActions";

export function add_gif(payload) {
  return { type: ADD_GIF, payload }
}

export function fetch_gif_loading() {
  return { type: FETCH_GIF_LOADING }
}

export function fetch_gif_success(payload) {
  return { type: FETCH_GIF_SUCCESS, payload }
}

export function fetch_gif_error(error) {
  return { type: FETCH_GIF_ERROR, error: error }
}
