import React, { Component } from "react";

import "./WeirdnessSelect.css";
import RangeSlider from "../RangeSlider/RangeSlider";

import { connect } from "react-redux";
import {
  add_gif,
  fetch_gif_loading,
  fetch_gif_success,
  fetch_gif_error
} from "../../Actions/rootActionCreator";

class WeirdnessSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifTitle: "",
      gifWeirdness: 0,
      shownGif: {
        gifURL: "",
        gifWeirdness: 0
      },
      loading: false,
      error: null
    };
  }

  shouldComponentRender() {
    const { loading } = this.props;
    if (loading === false) return false;
    return true;
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleGifSubmit = event => {
    event.preventDefault(event);
    //debugger;
    const { gifTitle, gifWeirdness } = this.state;
    this.fetchGifs(gifTitle, gifWeirdness);
  };

  //   handleGifSubmit = event => {
  //     event.preventDefault(event);
  //     const { gifTitle } = this.state;
  //     this.props.add_gif({ title: gifTitle });
  //     this.setState({ gifTitle: "" });
  //   };

  fetchGifs = (title, weirdness) => {
    //return () => {
    //debugger;
    fetch_gif_loading();
    fetch(
      `api.giphy.com/v1/gifs/translate?api_key=a9cP17n2rj8Q3uzZyF588a0qlelTTYhT&s=${title}&weirdness=${weirdness}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log("Error");
          throw res.error;
        }
        console.log("No Error.");
        fetch_gif_success({
          giphyURL: res.images.original,
          giphyWeirdness: this.state.gifWeirdness
        });
        return {
          giphyURL: res.images.original,
          giphyWeirdness: this.state.gifWeirdness
        };
      })
      .catch(error => {
        fetch_gif_error(error);
      });
    //};
  };

  render() {
    const { gifTitle } = this.state;
    return (
      <div id="leftBackground">
        <div>
          <p>
            Find out how weird you are by selecting the GIFs that make you
            laugh. We'll show you the least weird ones to start, but you can
            move the slider to make them weirder.
          </p>
          <br />
          <p>
            When you find a GIF you like, press the <i>Like</i> button. Once you
            like 5 GIFs, we'll show you how weird you are.
          </p>
        </div>
        <div>
          <form onSubmit={this.handleGifSubmit}>
            <div>
              <label htmlFor="gifTitle">Title</label>
              <input
                type="text"
                id="gifTitle"
                value={gifTitle}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">SAVE</button>
          </form>
          <img src={this.state.shownGif.gifURL} />
        </div>
        <RangeSlider />{" "}
        {/*Normally, I would attempt to create my own range slider, but due to time constraints, I'm choosing to use a library to simplify it*/}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add_gif: gif => dispatch(add_gif(gif)),
    fetch_gif_error: error => dispatch(fetch_gif_error(error)),
    fetch_gif_loading: () => dispatch(fetch_gif_loading()),
    fetch_gif_success: gif => dispatch(fetch_gif_success(gif))
  };
}

const mapStateToProps = state => ({
  error: fetch_gif_error(state),
  shownGif: fetch_gif_success(state),
  loading: fetch_gif_loading(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeirdnessSelect);
