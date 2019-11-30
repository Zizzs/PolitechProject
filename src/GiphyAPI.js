import {
    fetch_gif_loading,
    fetch_gif_success,
    fetch_gif_error
} from "./Actions/rootActionCreator";

const fetchGif = (title, weirdness) => {
    return dispatch => {
        dispatch(fetch_gif_loading());
        fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=a9cP17n2rj8Q3uzZyF588a0qlelTTYhT&s=${title}&weirdness=${weirdness}`
        )
            .then(res => {
                res = res.json();
                return res;
            })
            .then(res => {
                if (res.meta.status !== 200) {
                    throw res.error;
                }
                dispatch(fetch_gif_success({

                    gifURL: res.data.images.original.url,
                    gifTitle: res.data.title,
                    gifWeirdness: weirdness,
                    gifSearchTerm: title

                }));
                return {
                    shownGif: {
                        gifURL: res.data.images.original.url,
                        gifWeirdness: weirdness
                    }
                };
            })
            .catch(error => {
                dispatch(fetch_gif_error(error));
            });
    }
};

export default fetchGif;