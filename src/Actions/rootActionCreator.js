import { ADD_GIF, REMOVE_GIF, FETCH_GIF_LOADING, FETCH_GIF_SUCCESS, FETCH_GIF_ERROR, CLEAR_STATE } from "../Constants/rootActions";

export function add_gif(payload) {
  return { type: ADD_GIF, payload }
}

export function remove_gif(payload) {
  return { type: REMOVE_GIF, payload }
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

export function clear_state() {
  return { type: CLEAR_STATE }
}
