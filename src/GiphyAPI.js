import {
    fetch_gif_loading,
    fetch_gif_success,
    fetch_gif_error
} from "./Actions/rootActionCreator";

const fetchGif = (title, weirdness) => {
    return dispatch => {
        console.log("In Fetch");
        dispatch(fetch_gif_loading());
        console.log(`Fetching Gif with Title: ${title} Weirdness: ${weirdness}`);
        fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=a9cP17n2rj8Q3uzZyF588a0qlelTTYhT&s=${title}&weirdness=${weirdness}`
        )
            .then(res => {
                console.log("Converting data to JSON");
                res = res.json();
                return res;
            })
            // .then(res => res.text())
            // .then(text => console.log(text))
            .then(res => {
                console.log("The data:");
                console.log(res);
                if (res.meta.status !== 200) {
                    console.log("Error");
                    throw res.error;
                }
                console.log("No Error.");
                dispatch(fetch_gif_success({
                    giphyURL: res.data.images.original.url,
                    giphyWeirdness: this.state.gifWeirdness
                }));
                return {
                    giphyURL: res.data.images.original.url,
                    giphyWeirdness: this.state.gifWeirdness
                };
            })
            .catch(error => {
                dispatch(fetch_gif_error(error));
            });
    }
};

export default fetchGif;