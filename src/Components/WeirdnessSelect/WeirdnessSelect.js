import React, { Component } from "react";

import "./WeirdnessSelect.css";
import RangeSlider from "../RangeSlider/RangeSlider";
import DotLoader from "react-spinners/DotLoader";

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

  shouldComponentRender = () => {
    return this.state.loading;
  };

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
    //debugger;
    fetch_gif_loading();
    console.log(`Fetching Gif with Title: ${title} Weirdness: ${weirdness}`);
    fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=a9cP17n2rj8Q3uzZyF588a0qlelTTYhT&s=${title}&weirdness=${weirdness}`
    )
      .then(res => {
        console.log(res);
        console.log("Converting data to JSON");
        res = res.json();
        console.log(res);
        return res;
      })
      // .then(res => res.text())
      // .then(text => console.log(text))
      .then(res => {
        console.log("The data:");
        console.log(res);
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
  };

  render() {
    const { gifTitle } = this.state;

    if (this.shouldComponentRender()) {
      return (
        <DotLoader
          css={`display: block, margin: 0 auto, border-color: red`}
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
      );
    } else {
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
              When you find a GIF you like, press the <i>Like</i> button. Once
              you like 5 GIFs, we'll show you how weird you are.
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
            <div id="shownGif">
              <img alt="Random Gif" src={this.state.shownGif.gifURL} />
            </div>
          </div>
          <RangeSlider />{" "}
          {/*Normally, I would attempt to create my own range slider, but due to time constraints, I'm choosing to use a library to simplify it*/}
        </div>
      );
    }
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
